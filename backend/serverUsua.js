import express from "express";
import con from './conexao.js'

const appU = express();

// MiddLeware para parsear JSON
appU.use(express.json());

//Habilitar CORS para permitir requisiçoes do frontend
// CORS (Cross-Origin Resource Sharing/ Compartilhamento de recursos de origens diferentes)
appU.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Rota para obter todos os cadastros
appU.get("/usuario", (req, res) => {
    // executa a query para o banco de dados
    con.query('SELECT * FROM USUARIO', (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send({error: err.message});
        } else {
            res.send(result);
        }
    })
})

// Rota para cadastraar um novo usuario
appU.post("/usuario", (req, res) => {
    console.log('Dados recebidos:', req.body);

    const {email, senha, nome, cpf, cargo } = req.body;
    
    // Executa a query para inserir no banco de dados
    const sqlU = 'INSERT INTO USUARIO (email, senha, nome, cpf, cargo) VALUES (?, ?, ?, ?, ?)';

    con.query(sqlU,[email, senha, nome, cpf, cargo], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            res.status(500).send({success: false, message: 'Erro ao cadastrar usuário', error: err.message});
        } else {
            console.log('Usuário cadastrado com sucesso!');
            res.status(200).send({success: true, message:'Usuário cadastrado com sucesso!', id: result.insertId});
        }
    });
})

appU.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})