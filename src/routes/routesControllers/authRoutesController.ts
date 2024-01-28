import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import connection from "../../dataCenter";

interface SessionData {
    auth?: boolean;
    username?: string;
    _id?: string;
}

class authRoutes {
    async redirect(req: Request, res: Response) {
        try {
            res.status(200).redirect('/auth/login');
        } catch (error) {
            res.status(500).send({
                error: true,
                mensagem: 'Algo aconteceu ao gerar a renderização',
                description: error
            })
        }
    }

    async loginScreen(req: Request, res: Response) {
        try {
            res.status(200).render('pages/public/login', {
                title: 'Login',
                css: 'public/loginScreen.css',
                bootstrap: true,
                js: 'public/',
                socketConnection: false,
                adminJsFiles: false,
                info: req.flash("info")
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                mensagem: 'Algo aconteceu ao gerar a renderização',
                description: error
            })
        }
    }

    async setVoting(req: Request, res: Response) {
        const { id_purse }: any = req.body;
        const splited = id_purse.split('-');

        try {
            const [getSeries]: any = await connection.promise().query(`SELECT * FROM series WHERE content = ?`, [splited[0]]);

            if (getSeries.length != 0) {
                const [getKey]: any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ? AND content = ?`, [getSeries[0].id, splited[1]]);
                if (getKey.length != 0) {
                    if (getKey[0].status == 1) {
                        //Chave é válida
                        res.redirect(`/voting/select/${getSeries[0].content}/${getKey[0].content}`)
                    } else {
                        //Chave está expirada, quer dizer que alguem já usou
                        //Envie mensagem para ser renderizando que a chave já foi usada
                        res.status(500).render('pages/public/errors/invalid-keys', {
                            errorHandleMessage: 'Chave Expirada',
                            title: 'Selecionar canditado',
                            css: '/public/errors.css',
                            js: '',
                            bootstrap: false,
                            socketConnection: false,
                            adminJsFiles: false
                        });
                    }
                } else {
                    //Chave está inválida
                    //Quer dizer que escreveu a chave erradamente
                    res.status(500).render('pages/public/errors/invalid-keys', {
                        errorHandleMessage: 'Chave Inválida',
                        title: 'Selecionar canditado',
                        css: '/public/errors.css',
                        js: '',
                        bootstrap: false,
                        socketConnection: false,
                        adminJsFiles: false
                    });
                }
            } else {
                //Chave inválida
                //Response, de chave inválida
                res.status(500).render('pages/public/errors/invalid-keys', {
                    errorHandleMessage: 'Não existe tal serie inserida.',
                    title: 'Selecionar canditado',
                    css: '/public/errors.css',
                    js: '',
                    bootstrap: false,
                    socketConnection: false,
                    adminJsFiles: false
                });
            }
        } catch (error) {
            throw error;
        }

    }

    async setLogedIn(req: Request & { session: SessionData }, res: Response) {
        const { username, password } = req.body;
        const referer: any = req.get("Referer");
    
        if (username == '' || password == '') {
            req.flash("info", "Erro ao realizar login.");
            return res.redirect(referer);
        }
    
        const [getUsername]: any = await connection.promise().query(`SELECT * FROM users WHERE username = ?`, [username]);
        if (getUsername.length == 0) {
            req.flash("info", "Erro ao realizar login.");
            return res.redirect(referer);
        }
    
        bcryptjs.compare(password, getUsername[0].password, (error, match) => {
            if (error) {
                req.flash("info", "Erro ao realizar login.");
                return res.redirect(referer);
            }
    
            console.log(match);
    
            if (match) {
                var hour = 3600000 * 24;
                req.session.cookie.expires = new Date(Date.now() + hour);
                req.session.cookie.maxAge = hour;
    
                req.session.auth = true;
                req.session.username = getUsername[0].username;
                req.session._id = getUsername[0].id;
    
                return res.redirect('/');
            } else {
                req.flash("info", "Erro ao realizar login.");
                return res.redirect(referer);
            }
        });
    }
    

    async logOut(req: Request, res: Response) {
        req.session.destroy(function (err) {
            if (err) {
                console.log("Something bad happedned!");
            } else {
                return res.redirect("/");
            }
        })
    }

    async UserSettings(req: Request, res: Response) {
        const session = req.session;
        const [series]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

        res.status(200).render('pages/private/editprofile', {
            title: 'Editar perfil',
            css: '/private/editprofile.css',
            js: '',
            bootstrap: true,
            socketConnection: true,
            adminJsFiles: true,
            session: session,
            series: series,
            info: req.flash('info')
        });
    }

    async ChangePassword(req: Request, res: Response) {
        const session = req.session;
        const [series]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

        res.status(200).render('pages/private/changepassword', {
            title: 'Editar perfil',
            css: '/private/editprofile.css',
            js: '',
            bootstrap: true,
            socketConnection: true,
            adminJsFiles: true,
            session: session,
            series: series,
            info: req.flash('info')
        });
    }
}

export default authRoutes;