import connection from "../../dataCenter";
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
        try {
            const getAllData = () => {
                return new Promise((resolve, reject) => {
                    let rowObject :any = {};

                    connection.query(`SELECT * FROM series ORDER BY id DESC`, function (error: any, series: any) {
                        if (error) {
                            reject(error);
                            return;
                        }

                        // Contador para rastrear consultas concluídas
                        let completedQueries = 0;

                        for (let i = 0; i < series.length; i++) {
                            const _series = series[i];

                            connection.query(`SELECT * FROM credential WHERE series_id = ?`, [_series.id], function (error: any, credentials: any) {
                                const rowLine = {
                                    _series,
                                    credentials
                                };

                                // Adicionar ao objeto
                                rowObject[i] = rowLine;

                                // Verificar se todas as consultas foram concluídas
                                completedQueries++;
                                if (completedQueries === series.length) {
                                    resolve(rowObject);
                                }
                            });
                        }
                    });
                });
            };

            getAllData().then((result) => {
                res.status(200).render('pages/private/admin-keys', {
                    title: 'Dashboard',
                    css: 'private/admin-dash.css',
                    bootstrap: true,
                    js: 'private/',
                    socketConnection: true,
                    adminJsFiles: true,
                    ObjectOverKey: result
                });    
            }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default dashRoutes; 