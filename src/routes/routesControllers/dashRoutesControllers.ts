import { Request, Response } from "express";

class dashRoutes {
    async arquiveVotation(req: Request, res: Response) {
        res.status(200).render('pages/private/admin-votation', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: 'private/',
            socketConnection: true,
            adminJsFiles: true
        });
    }

    async arquiveKeys(req: Request, res: Response) {
        res.status(200).render('pages/private/admin-keys', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: 'private/',
            socketConnection: true,
            adminJsFiles: true
        });
    }
}

export default dashRoutes;