import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    database: "voting_appplication",
    password: "1234",
    user: "antares"
});

connection.connect((error :any)=> {
    if(error){
        console.log('Something bad happened serving the app!');
    }else{
        console.log('Project connected to the database!');
    }
});

export default connection;