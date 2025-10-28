import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: '',
    database: 'projeto1'
});

// Conectar ao banco de dados
con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});

export default con;