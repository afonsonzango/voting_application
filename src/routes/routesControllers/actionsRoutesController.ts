import { Request, Response } from "express";
import fs from "fs";
import PDFDocument from "pdfkit";
import connection from "../../dataCenter";
import { WriteStream } from "fs";

class authRoutes {
    async exportPdfKeys(req: Request, res: Response) {

        try {
            const [serie]: any = await connection.promise().query('SELECT * FROM series WHERE id = ?', [req.params.series]);
            const [credentials]: any = await connection.promise().query('SELECT * FROM credential WHERE series_id = ?', [serie[0].id]);

            const file_path = `${credentials.length}_ID_de_serie_${serie[0].content}.pdf`

            // Criação do documento PDF
            const doc = new PDFDocument();
            await doc.pipe(fs.createWriteStream(file_path));

            // Adiciona informações ao PDF
            await doc.fontSize(20).text(`${credentials.length} ID's de série ${serie[0].content}`, { align: 'left' });

            doc.moveDown();

            await credentials.forEach((ids: any) => {
                doc.fontSize(14).text(`${serie[0].content}-${ids.content}`, { align: 'left' });
                doc.moveDown();
            });

            // Finaliza e fecha o PDF
            await doc.end();

            console.log('PDF gerado com sucesso.');

            // Envie o PDF como resposta para o navegador
            res.download(`./${file_path}`, (error) => {
                if (error) {
                    console.error('Erro ao enviar o PDF como resposta:', error);
                } else {
                    console.log('PDF enviado com sucesso como resposta.');
                    // Remova o arquivo após o envio
                    fs.unlinkSync(`./${file_path}`);
                }
            });

            console.log('PDF gerado com sucesso.');

            // Envie o PDF como resposta para o navegador
            setTimeout(() => {
                res.download(`./${file_path}`, (error) => {
                    if (error) {
                        console.error('Erro ao enviar o PDF como resposta:', error);
                    } else {
                        console.log('PDF enviado com sucesso como resposta.');
                        // Remova o arquivo após o envio
                        fs.unlinkSync(`./${file_path}`);
                    }
                });
            }, 2000);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        }

    }
}

export default authRoutes;