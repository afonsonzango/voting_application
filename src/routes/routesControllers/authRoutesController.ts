import { Request, Response } from "express";
import connection from "../../dataCenter";

class authRoutes {
    async redirect (req: Request, res: Response) {
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

    async loginScreen (req: Request, res: Response) {
        try {
            res.status(200).render('pages/public/login', {
                title: 'Login',
                css: 'public/loginScreen.css',
                bootstrap: true,
                js: 'public/',
                socketConnection: false,
                adminJsFiles: false
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                mensagem: 'Algo aconteceu ao gerar a renderização',
                description: error
            })
        }
    }

    async setVoting (req: Request, res: Response) {
        const {id_purse}:any = req.body;
        const splited = id_purse.split('-');
        
        try {
            const [getSeries]:any = await connection.promise().query(`SELECT * FROM series WHERE content = ?`, [splited[0]]);

            if(getSeries.length != 0){
                const [getKey]:any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ? AND content = ?`, [getSeries[0].id, splited[1]]);
                if(getKey.length != 0){
                    if(getKey[0].status == 1){
                        //Chave é válida
                        res.redirect(`/voting/select/${getSeries[0].content}/${getKey[0].content}`)
                    }else{
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
}

export default authRoutes;