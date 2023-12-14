const { exec } = require('child_process');
const fs = require('fs');

const dbConfig = {
    host: "localhost",
    database: "voting_appplication",
    password: "",
    user: "root"
};

// Nome do arquivo de saída
const outputFileName = 'backup.sql';

// Comando para exportar o banco de dados usando mysqldump
const command = `mysqldump -h localhost -P 3306 -u ${dbConfig.user} -p${dbConfig.password} ${dbConfig.database} > ${outputFileName}`;

// Executa o comando no terminal
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error('Erro ao exportar o banco de dados:', error);
    } else {
        console.log('Banco de dados exportado com sucesso.');
    }
});