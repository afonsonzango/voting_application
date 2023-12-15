import { Request, Response } from "express";
import fs from "fs";
import PDFDocument from "pdfkit";
import connection from "../../dataCenter";

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

        try{
            const [chave]:any = await connection.promise().query(`SELECT * FROM series WHERE id = ?`, [key_id]);
            await connection.promise().query(`DELETE FROM credential WHERE series_id = ?`, [chave[0].id]);
            await connection.promise().query(`DELETE FROM series WHERE id = ?`, [key_id]);

            res.redirect('/dashboard/arquive-keys');
        } catch (erro) {
            console.log(erro);
        }
    }
}

export default authRoutes;