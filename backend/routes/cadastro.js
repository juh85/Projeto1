import express from 'express';
import con from '../conexao.js';

const router = express.Router();

// Rota para obter todos os cadastros de veículos
router.get('/listaCadastro', (req, res) => {
    con.query('SELECT * FROM CADASTROVEICULO', (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send({ error: err.message });
        } else {
            res.send(result);
        }
    });
});

// Rota para cadastrar novo veículo
router.post('/cadastrar', (req, res) => {
    const { username, carro, placa, vaga, torre, apt } = req.body;

    const sql = 'INSERT INTO CADASTROVEICULO (proprietario, placa, modelo, numVagas, torre, apartamento) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(sql, [username, placa, carro, vaga, torre, apt], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            res.status(500).send({ success: false, message: 'Erro ao cadastrar veículo', error: err.message });
        } else {
            res.status(200).send({ success: true, message: 'Veículo cadastrado com sucesso!', id: result.insertId });
        }
    });
});

export default router;


