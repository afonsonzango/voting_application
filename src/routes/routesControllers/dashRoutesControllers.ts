import { Request, Response } from "express";

class dashRoutes {
    async arquiveVotation(req: Request, res: Response) {
        res.status(200).render('pages/private/admin-votation', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: 'private/key-gen-func.js'
        });
    }

    async arquiveKeys(req: Request, res: Response) {
        res.status(200).render('pages/private/admin-keys', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: 'private/key-gen-func.js'
        });
    }
}

export default dashRoutes;