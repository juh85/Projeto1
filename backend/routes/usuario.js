import express from 'express';
import con from '../conexao.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/listaUsuario', (req, res) => {
    con.query('SELECT * FROM USUARIO', (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send({ error: err.message });
        } else {
            res.send(result);
        }
    });
});

// Rota para cadastrar um novo usuário
router.post('/usuario', (req, res) => {
    const { email, senha, nome, cpf, cargo } = req.body;

    const sqlU = 'INSERT INTO USUARIO (email, senha, nome, cpf, cargo) VALUES (?, ?, ?, ?, ?)';
    con.query(sqlU, [email, senha, nome, cpf, cargo], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            res.status(500).send({ success: false, message: 'Erro ao cadastrar usuário', error: err.message });
        } else {
            res.status(200).send({ success: true, message: 'Usuário cadastrado com sucesso!', id: result.insertId });
        }
    });
});

export default router;


