import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { generateIds } from '../utilities/keyGenerator';
import { seriesGenerator } from '../utilities/seriesGenerator';
import connection from '../dataCenter';
import { Request, Response } from 'express';
import fs, { copyFileSync } from "fs";

module.exports = function socketConnection(server: Server) {
    const io: SocketIOServer = require('socket.io')(server, {
        maxHttpBufferSize: 2 * 1024 * 1024
    });

    io.on('connection', function (socket: Socket) {
        socket.on('gen_key_limit', function (data) {
            const limit = Number(data);

            if (10000 >= limit && limit > 0) {
                async function keyGeneratingProcesses() {
                    const seriesKey = await seriesGenerator();

                    connection.query('INSERT INTO series SET content = ?', [seriesKey], function (error) {
                        if (error) {
                            socket.emit('erroGenNum', 'Algo de errado aconteceu, tente novamente!');
                        } else {
                            connection.query('SELECT * FROM series WHERE content = ?', [seriesKey], async function (error, results: any) {
                                if (error) {
                                    socket.emit('erroGenNum', 'Algo de errado aconteceu, tente novamente!');
                                } else {
                                    const serieId = results[0].id;
                                    const ids = await generateIds(limit);

                                    for (let i = 0; i < ids.length; i++) {
                                        try {
                                            await connection.promise().query('INSERT INTO credential SET series_id = ?, content = ?', [serieId, ids[i]]);
                                            console.log(`Inserted record with series_id: ${serieId} and content: ${ids[i]}`);
                                        } catch (error) {
                                            console.error('Error inserting record:', error);
                                            socket.emit('erroGenNum', 'Algo de errado aconteceu ao salvar as chaves, por favor, tente novamente!');
                                        }

                                        if (i == ids.length - 1) {
                                            socket.emit('done');
                                        }
                                    }
                                }
                            });
                        }
                    });
                }

                keyGeneratingProcesses();
            } else {
                socket.emit('erroGenNum', 'Valor de gerência é inválido!');
            }
        });

        socket.on('setUpWarier', async function (imagem, nome) {
            const filename_path = `assets/midea/waries/warier-${Date.now()}.jpeg`;
            const _filename_path = `/midea/waries/warier-${Date.now()}.jpeg`;
            
            fs.writeFile(filename_path, imagem, function(error) {
                if (error) {
                    console.error('Error writing file:', error);
                } else {
                    console.log('File saved successfully:', imagem);
                }
            });

            try {
                await connection.promise().query('INSERT INTO wariers SET nome = ?, img = ?', [nome, _filename_path]);
                socket.emit('warierInserted');
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('deleteWarier', async function(data, res: Response) {
            const myDelQuery = `
                DELETE FROM wariers WHERE id = ${data}
            `

            try {
                const [dlt_query]:any = await connection.promise().query(myDelQuery)
                
                const results = {
                    dlt_query,
                    data
                }

                socket.emit('userDeleted', results);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('getWariersBySearch', function(data) {
            connection.query('SELECT * FROM wariers WHERE nome LIKE ? LIMIT 6', ['%'+data+'%'], function(error, results){
                if(error) throw error;
                socket.emit('setResults', results);
            });
        }); 

        socket.on('getWarierInformations', async function(data) {
            try {
                const [warier]:any = await connection.promise().query(`SELECT * FROM wariers WHERE id = ?`, [data]);
                socket.emit('setUpWarier', warier);
            } catch (error) {
                throw error;
            };
        });

        socket.on('setUpNewBattle', async function(data :any){
            try {
                await connection.promise().query(`UPDATE battles SET status = ?`, [0]);
                await connection.promise().query(`
                     	 INSERT INTO battles SET
                     	 
                         warier_id1 = ?, 
                         warier_id2 = ?, 
                         keySerie_1 = ?, 
                         keySerie_2 = ?, 
                         keySerie_3 = ?, 
                         keySerie_4 = ?,
                         status = ?`,

                     [
                         data.warier1, 
                         data.warier2, 
                         Number(data.keySeries1), 
                         Number(data.keySeries2), 
                         Number(data.keySeries3), 
                         Number(data.keySeries4),
                         1
                     ]
                );

                const keySeriesObject = [
                    data.keySeries1, 
                    data.keySeries2, 
                    data.keySeries3, 
                    data.keySeries4
                ];
                
                keySeriesObject.forEach(async (element) => {
                    if(element){
						await connection.promise().query(`UPDATE series SET useable = ? WHERE id = ?`, [0, element]);
					}
                });
                
                socket.emit('removeLoader');
            } catch (error){
                console.log(error);
            }
        });

        //Verificar se há batalhas activas
        socket.on('verfifyActiveBattle', async function(){
            const [battle]:any = await connection.promise().query(`SELECT * FROM battles WHERE status = 1`);            
            socket.emit('battleStatusResponse', battle);
        });

        //Receber dados, salvar os votos e invalidar chave
        socket.on('setUpVote', async function(data){
            const [verifyKey]:any = await connection.promise().query(`SELECT * FROM credential WHERE id = ? AND status = ?`, [data.key_dom_id, 1]);
            try {
                if(verifyKey.length != 0) {
                    console.log(data.key_dom_id);
                    await connection.promise().query(`INSERT INTO set_votes SET battle_id = ?, key_id = ?, warier_selected = ?`, [data.battle_id, data.key_dom_id, data.warierId]);
                    await connection.promise().query(`UPDATE credential SET status = ? WHERE id = ?`, [0, data.key_dom_id]);
                    
                    socket.broadcast.emit('voteSettedTo', data);
                    socket.emit('voteSettedTo', data);
                }else{
                    console.log('Chave expirada.');
                }
            } catch (error) {
                console.error('Erro: ' +error);
            }
        });

        //Terminar batalha
        socket.on('endvotation', async function() {
            try {
                const [battle]:any = await connection.promise().query(`SELECT * FROM battles WHERE status = 1`);
                
                if (battle.length == 1) {
                    const wariers = [battle[0].warier_id1, battle[0].warier_id2];
                    const _battle = battle[0].id;

                    const [voltesForWr1]:any = await connection.promise().query(`SELECT * FROM set_votes WHERE battle_id = ? AND warier_selected = ?`, [_battle, wariers[0]]);
                    const [voltesForWr2]:any = await connection.promise().query(`SELECT * FROM set_votes WHERE battle_id = ? AND warier_selected = ?`, [_battle, wariers[1]]);
                    
                    const battleResults:any = {
                        forWr1: voltesForWr1.length,
                        forWr2: voltesForWr2.length
                    }

                    await connection.promise().query('UPDATE battles SET warier_votes_1 = ?, warier_votes_2 = ? WHERE id = ?', [battleResults.forWr1, battleResults.forWr2, _battle]);
                    await connection.promise().query('UPDATE battles SET status = 0');

                    socket.emit('battlefinished', battleResults);
                }else{
                    console.log("Algo deu errado.");
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
}
