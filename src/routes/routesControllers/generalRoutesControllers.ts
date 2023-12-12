import { Request, Response } from "express";

class generalRoutes {
    async redirect (req: Request, res: Response){
        try {
            res.status(200).redirect('/voting');
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Something bad happened...'
            });
        }
    }

    async information (req: Request, res: Response) {
        try {
            res.status(200).render('pages/public/information', {
                title: "Bem vindo - Introdução",
                css: "public/",
                bootstrap: true,
                js: 'public/',
                socketConnection: false,
                adminJsFiles: false
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Something bad happened...',
                description: error
            });
        }
    }

    async voting (req: Request, res: Response) {
        try {
            res.render('pages/public/voting', {
                title: "Conceder Voto",
                css: "public/voting.css",
                bootstrap: true,
                js: 'public/',
                socketConnection: false,
                adminJsFiles: false
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Something bad happened...',
                description: error
            });
        }
    }

    async select (req: Request, res: Response) {
        try {
            res.status(200).render('pages/public/select', {
                title: 'Selecionar canditado',
                css: 'public/select.css',
                js: 'public/select-animation.js',
                bootstrap: true,
                socketConnection: false,
                adminJsFiles: false
            });
        } catch (error) {
            res.status(500).send({
                error: true,
                mensagem: 'Erro ao renderizar rota',
                description: error
            });
        }
    }
}

export default generalRoutes;