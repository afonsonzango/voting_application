import { Request, Response } from "express";
import fs from "fs";
import bcryptjs from "bcryptjs";
import PDFDocument from "pdfkit";
import connection from "../../dataCenter";

interface SessionData {
    username?: string;
    _id?: number;
}

class authRoutes {
    async exportPdfKeys(req: Request, res: Response) {
        try {
            const [serie]: any = await connection.promise().query('SELECT * FROM series WHERE id = ?', [req.params.series]);
            const [credentials]: any = await connection.promise().query('SELECT * FROM credential WHERE series_id = ?', [serie[0].id]);

            await connection.promise().query(`UPDATE series SET expo = ? WHERE id = ?`, [1, serie[0].id]);

            const file_path = `${credentials.length}_ID_de_serie_${serie[0].content}.pdf`

            // Criação do documento PDF
            const doc = new PDFDocument();
            await doc.pipe(fs.createWriteStream(file_path));

            // Adiciona informações ao PDF
            await doc.fontSize(20).text(`${credentials.length} ID's de série ${serie[0].content}`, { align: 'left' });

            doc.moveDown();

            await credentials.forEach((ids: any) => {
                doc.fontSize(14).text(`${serie[0].content}-${ids.content}`, { align: 'left' });
                doc.moveDown();
            });

            // Finaliza e fecha o PDF
            await doc.end();

            console.log('PDF gerado com sucesso.');

            setTimeout(async () => {
                await res.download(`./${file_path}`, (error) => {
                    if (error) {
                        console.error('Erro ao enviar o PDF como resposta:', error);
                    } else {
                        fs.unlinkSync(`./${file_path}`);
                        console.log('PDF enviado com sucesso como resposta.');
                    }
                });
            }, 300);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        }

    }

    async removeKey(req: Request, res: Response) {
        const key_id = Number(req.params.key_id)

        try {
            const [chave]: any = await connection.promise().query(`SELECT * FROM series WHERE id = ?`, [key_id]);
            await connection.promise().query(`DELETE FROM credential WHERE series_id = ?`, [chave[0].id]);
            await connection.promise().query(`DELETE FROM series WHERE id = ?`, [key_id]);

            res.redirect('/dashboard/arquive-keys');
        } catch (erro) {
            console.log(erro);
        }
    }

    async changePassword(req: Request, res: Response) {
        const user_id = Number(req.params.user_id);
        const { currentpassword, newpassword_1, newpassword_2 } = req.body;
        const referer: any = req.get('Referer');

        if (currentpassword == '' || newpassword_1 == '' || newpassword_2 == '') {
            req.flash('info', 'Todos os campos devem ser devidamente preenchidos.');
            res.redirect(referer);
        } else if (newpassword_1 != newpassword_2) {
            req.flash('info', 'As novas senhas devem ser iguais.');
            res.redirect(referer);
        } else {

            try {
                const [getUserForPassword]: any = await connection.promise().query(`SELECT * FROM users WHERE id = ?`, [user_id]);

                if (getUserForPassword.length != 0) {
                    const DbUserPass: any = getUserForPassword[0].password;

                    bcryptjs.compare(currentpassword, DbUserPass, async (error, match) => {
                        if (error) {
                            throw error;
                        }

                        if (match) {
                            const newPassword: any = await bcryptjs.hash(newpassword_1, 10);

                            console.log(newPassword);

                            try {
                                await connection.promise().query(`UPDATE users SET password = ? WHERE id = ?`, [newPassword, user_id]);

                                req.flash('info', 'success');
                                res.redirect(referer);
                            } catch (error) {
                                if (error) {
                                    throw error;
                                }
                            }
                        } else {
                            req.flash('info', 'Senha corrent incorreta. Tente novamente.');
                            res.redirect(referer);
                        }
                    });
                } else {
                    console.log("Nenhum usuario encontrado.");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async changeUserName(req: Request & { session: SessionData }, res: Response) {
        const { fUsername, password } = req.body;
        const sUsername = req.session.username;
        const sId = req.session._id;
        const referer: any = req.get('Referer');
    
        if (fUsername === "" || password === "") {
            req.flash("info", "Todos os campos devem ser preenchidos.");
            return res.redirect(referer);
        }
    
        if (sUsername === fUsername) {
            req.flash("info", "Você digitou o usuário atual.");
            return res.redirect(referer);
        }
    
        try {
            const [dbPassword]: any = await connection.promise().query(`SELECT * FROM users WHERE username = ?`, sUsername);
    
            console.log(dbPassword);

            const match = await new Promise<boolean>((resolve, reject) => {
                bcryptjs.compare(password, dbPassword[0].password, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
    
            if (match) {
                await connection.promise().query(`UPDATE users SET username = ? WHERE id = ?`, [fUsername, sId]);
                return res.redirect('/auth/log-out');
            } else {
                req.flash("info", "Senha incorreta");
                return res.redirect(referer);
            }
        } catch (error) {
            req.flash("info", "Erro ao lidar com informações, tente novamente mais tarde.");
            return res.redirect(referer);

            console.log(error);
        }
    }
    
}

export default authRoutes;