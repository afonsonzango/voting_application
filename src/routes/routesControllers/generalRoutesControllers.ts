import { Request, Response } from "express";
import { connect } from "http2";
import connection from "../../dataCenter";

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
        const {series, content}:any = req.params
        const [getVotingStatus]:any = await connection.promise().query(`SELECT * FROM battles WHERE status = ?`, [1]);

        const [series_id]:any = await connection.promise().query(`SELECT * FROM series WHERE content = ?`, [series]); 
        const [key_content]:any = await connection.promise().query(`SELECT * FROM credential WHERE content = ?`, [content]); 

        const availabelSeries = {
            keySeries_1: getVotingStatus[0].keySerie_1,
            keySeries_2: getVotingStatus[0].keySerie_2,
            keySeries_3: getVotingStatus[0].keySerie_3,
            keySeries_4: getVotingStatus[0].keySerie_4,
        }

        //Setup Object Field Lines
        const [battleActive]:any = await connection.promise().query(`SELECT * FROM battles WHERE status = ?`, [1]);
        const [warier1]:any = await connection.promise().query('SELECT * FROM wariers WHERE id = ?', [battleActive[0].warier_id1]);
        const [warier2]:any = await connection.promise().query('SELECT * FROM wariers WHERE id = ?', [battleActive[0].warier_id2]);
        
        const battle = {
            battleActive,
            wariers: {
                warier1,
                warier2
            }
        }
        //Setup Object Field Lines
        
        //Verfify keys integrity
        if(availabelSeries.keySeries_1 == series_id[0].id || availabelSeries.keySeries_2 == series_id[0].id || availabelSeries.keySeries_3 == series_id[0].id || availabelSeries.keySeries_4 == series_id[0].id) {
            const [verifyIdentCredSeries]:any = await connection.promise().query(`SELECT * FROM credential WHERE series_id = ? AND id = ?`, [series_id[0].id, key_content[0].id]);
            
            if(verifyIdentCredSeries.length != 0){
                if(verifyIdentCredSeries[0].status != 1){
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
            }else{
                //Chave está inexistente
                //Quer dizer que a chave não existe, mesmo que exista a serie
                res.status(500).render('pages/public/errors/invalid-keys', {
                    errorHandleMessage: 'Chave inexistente',
                    title: 'Selecionar canditado',
                    css: '/public/errors.css',
                    js: '',
                    bootstrap: false,
                    socketConnection: false,
                    adminJsFiles: false
                });
            }
        }else{
            //Chave está inválida
            //Quer dizer que escreveu a chave erradamente ou a serie não foi atrelada à actual votação
            res.status(500).render('pages/public/errors/invalid-keys', {
                errorHandleMessage: 'Série Inexistente ou não atrelada à votação',
                title: 'Selecionar canditado',
                css: '/public/errors.css',
                js: '',
                bootstrap: false,
                socketConnection: false,
                adminJsFiles: false
            });
        }
        //Verfify keys integrity

        try {
            res.status(200).render('pages/public/select', {
                title: 'Selecionar canditado',
                css: 'public/select.css',
                js: 'public/select-animation.js',
                bootstrap: true,
                socketConnection: true,
                adminJsFiles: true,
                series: series_id[0].id, 
                content: key_content[0].id,
                battle
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