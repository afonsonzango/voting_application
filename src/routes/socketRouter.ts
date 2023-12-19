import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { generateIds } from '../utilities/keyGenerator';
import { seriesGenerator } from '../utilities/seriesGenerator';
import connection from '../dataCenter';
import { Request, Response } from 'express';
import fs from "fs";

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

        socket.on('setUpWarier', async function (imagem, nome, res: Response) {
            const filename_path = `assets/midea/waries/warier-${Date.now()}.jpeg`;
            
            fs.writeFile(filename_path, imagem, function(error) {
                if (error) {
                    console.error('Error writing file:', error);
                } else {
                    console.log('File saved successfully:', imagem);
                }
            });

            
            try {
                await connection.promise().query('INSERT INTO wariers SET nome = ?, img = ?', [nome, filename_path]);
                socket.emit('warierInserted');
            } catch (error) {
                res.status(500).send({
                    error: true,
                    menagem: 'Algo deu errado ao salvar informações',
                    error_desc: error
                })
            }

        });
    });
}
