import { Request, Response } from "express";

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
}

export default authRoutes;