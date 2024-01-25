import connection from "../../dataCenter";
import { Request, Response } from "express";

class dashRoutes {
    async arquiveVotation(req: Request, res: Response) {
        const [series]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

        const [results]: any = await connection.promise().query(`
            SELECT b.*, w1.nome as nome1, w1.img as img1, w2.nome as nome2, w2.img as img2
            FROM battles b
            JOIN wariers w1 ON b.warier_id1 = w1.id
            JOIN wariers w2 ON b.warier_id2 = w2.id
            ORDER BY id DESC
        `);

        const formattedResults = results.map((result: { id: any; warier_id1: any; warier_id2: any; warier_votes_1: any; warier_votes_2: any; keySerie_1: any; keySerie_2: any; keySerie_3: any; keySerie_4: any; status: any; nome1: any; img1: any; nome2: any; img2: any; }) => ({
            id: result.id,
            warier_id1: result.warier_id1,
            warier_id2: result.warier_id2,
            warier_votes_1: result.warier_votes_1,
            warier_votes_2: result.warier_votes_2,
            status: result.status,
            warier1: {
                nome: result.nome1,
                img: result.img1
            },
            warier2: {
                nome: result.nome2,
                img: result.img2
            }
        }));

        res.status(200).render('pages/private/admin-votation', {
            title: 'Dashboard',
            css: 'private/admin-dash.css',
            bootstrap: true,
            js: '',
            socketConnection: true,
            adminJsFiles: true,
            series,
            battles: formattedResults
        });
    }

    async arquiveKeys(req: Request, res: Response) {
        try {
            const [series_availeable]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);

            const getAllData = () => {
                return new Promise((resolve, reject) => {
                    let rowObject: any = {};

                    connection.query(`SELECT * FROM series ORDER BY id DESC`, function (error: any, all_series: any) {
                        if (error) {
                            reject(error);
                            return;
                        }

                        if (all_series.length == 0) {
                            res.status(200).render('pages/private/admin-keys', {
                                title: 'Dashboard',
                                css: 'private/admin-dash.css',
                                bootstrap: true,
                                js: '',
                                socketConnection: true,
                                adminJsFiles: true,
                                ObjectOverKey: [],
                                series: series_availeable
                            });
                        }

                        // Contador para rastrear consultas concluídas
                        let completedQueries = 0;

                        for (let i = 0; i < all_series.length; i++) {
                            const _series = all_series[i];

                            connection.query(`SELECT * FROM credential WHERE series_id = ?`, [_series.id], function (error: any, credentials: any) {
                                const rowLine = {
                                    _series,
                                    credentials
                                };

                                // Adicionar ao objeto
                                rowObject[i] = rowLine;

                                // Verificar se todas as consultas foram concluídas
                                completedQueries++;
                                if (completedQueries === all_series.length) {
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
                    ObjectOverKey: result,
                    series: series_availeable
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
            const [series_useable]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);
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
            const [series]: any = await connection.promise().query('SELECT * FROM series WHERE useable = ?', [1]);
            const [waries]: any = await connection.promise().query(`SELECT * FROM wariers ORDER BY id DESC`);

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

    async watch(req: Request, res: Response) {
        const [battleActive]: any = await connection.promise().query(`SELECT * FROM battles WHERE status = ?`, [1]);

        if (battleActive.length == 1) {
            const [warier1]: any = await connection.promise().query('SELECT * FROM wariers WHERE id = ?', [battleActive[0].warier_id1]);
            const [warier2]: any = await connection.promise().query('SELECT * FROM wariers WHERE id = ?', [battleActive[0].warier_id2]);

            console.log(warier1);
            console.log(warier2);

            const battle = {
                battleActive,
                wariers: {
                    warier1,
                    warier2
                }
            }

            const [votesW1]: any = await connection.promise().query('SELECT * FROM set_votes WHERE battle_id = ? AND warier_selected = ?', [battleActive[0].id, warier1[0].id]);
            const [votesW2]: any = await connection.promise().query('SELECT * FROM set_votes WHERE battle_id = ? AND warier_selected = ?', [battleActive[0].id, warier2[0].id]);

            const votes = {
                w1: votesW1.length,
                w2: votesW2.length
            }

            res.status(200).render('pages/private/vote-scale', {
                title: 'Watch Votation',
                css: 'private/vote-scale.css',
                bootstrap: true,
                js: '',
                socketConnection: true,
                adminJsFiles: true,
                battle,
                votes
            });
        }
    }
}

export default dashRoutes; 