import connection from "../../dataCenter";
import { Request, Response } from "express";

class dashRoutes {
    async arquiveVotation(req: Request, res: Response) {
        const [series]:any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

        res.status(200).render('pages/private/admin-votation', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: '',
            socketConnection: true,
            adminJsFiles: true,
            series
        });
    }

    async arquiveKeys(req: Request, res: Response) {
        try {
            const [series]:any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

            const getAllData = () => {
                return new Promise((resolve, reject) => {
                    let rowObject: any = {};

                    connection.query(`SELECT * FROM series ORDER BY id DESC`, function (error: any, series: any) {
                        if (error) {
                            reject(error);
                            return;
                        }

                        if (series.length == 0) {
                            res.status(200).render('pages/private/admin-keys', {
                                title: 'Dashboard',
                                css: 'private/admin-dash.css',
                                bootstrap: true,
                                js: '',
                                socketConnection: true,
                                adminJsFiles: true,
                                ObjectOverKey: [],
                                series
                            });
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
                    js: '',
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

    async arquiveKeysAll(req: Request, res: Response) {
        const keys_id = req.params.keys_id;

        try {
            const [series_useable]:any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);
            const [series]: any = await connection.promise().query(`SELECT * FROM series WHERE id = ?`, [keys_id]);

            if (series.length == 0) {
                res.status(400).send({
                    erro: true,
                    mensagem: 'Serie inexistente'  
                });
            } else {
                const [credentials_all]: any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ?`, [keys_id]);
                const [credentials_usable]: any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ? AND status = ?`, [keys_id, 0]);
                const [credentials_unusable]: any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ? AND status = ?`, [keys_id, 1]);

                let response = {
                    series,
                    credentials: {
                        credentials_all, 
                        credentials_usable,
                        credentials_unusable,
                    }
                }

                res.status(200).render('pages/private/admin-keys-all', {
                    title: `Série ${series[0].content}`,
                    css: "private/admin-dash.css",
                    bootstrap: true,
                    js: '',
                    socketConnection: true,
                    adminJsFiles: true,
                    credentialsList: response,
                    series: series_useable
                });

                console.log(response);
            }
        } catch (error) {
            res.status(500).send('Algo correu mal ao buscar os dados.');
        }
    }

    async arquiveWariesAll(req: Request, res: Response) {
        try {
            const [series]:any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);
            const [waries]:any = await connection.promise().query(`SELECT * FROM wariers ORDER BY id DESC`);

            res.status(200).render('pages/private/admin-waries', {
                title: 'Dashboard',
                css: 'private/admin-dash.css',
                bootstrap: true,
                js: '',
                socketConnection: true,
                adminJsFiles: true,
                waries: waries,
                series: series
            });   
        } catch (error) {
            res.json({
                error: true,
                mensagem: 'Erro interno da aplicação.',
                _error: error
            })
        }
    }
}

export default dashRoutes; 