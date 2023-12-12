import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { generateIds } from '../utilities/keyGenerator';
import { seriesGenerator } from '../utilities/seriesGenerator';
import connection from '../dataCenter';

module.exports = function socketConnection(server: Server) {
    const io: SocketIOServer = require('socket.io')(server);

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
    });
}
