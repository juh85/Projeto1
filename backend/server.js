import express from "express";
import con from './conexao.js'

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS para permitir requisições do frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota para obter todos os cadastros
app.get("/", (req, res) => {
   // executa a query para o banco de dados
   con.query('SELECT * FROM CADASTROVEICULO', (err, result) =>{
    if (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).send({ error: err.message });
    } else {
        res.send(result);
    }
   })
})

// Rota para cadastrar novo veículo
app.post("/cadastrar", (req, res) => {
    console.log('Dados recebidos:', req.body);
    
    const { username, carro, placa, vaga, torre, apt } = req.body;
    
    // Executa a query para inserir no banco de dados
    const sql = 'INSERT INTO CADASTROVEICULO (proprietario, placa, modelo, numVagas, torre, apartamento) VALUES (?, ?, ?, ?, ?, ?)';
    
    con.query(sql, [username, placa, carro, vaga, torre, apt], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            res.status(500).send({ success: false, message: 'Erro ao cadastrar veículo', error: err.message });
        } else {
            console.log('Veículo cadastrado com sucesso!');
            res.status(200).send({ success: true, message: 'Veículo cadastrado com sucesso!', id: result.insertId });
        }
    });
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})
