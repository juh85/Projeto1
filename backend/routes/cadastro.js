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


// Rota para excluir um cadastro de veiculos
router.delete('/excluirCadastro/:id_veiculo', (req, res) => {
    const id_veiculo = req.params.id_veiculo;

    // Validar se o ID é um número válido
    if (!id_veiculo || isNaN(id_veiculo)) {
        return res.status(400).send({success: false, message: 'ID do veículo inválido'});
    }

    const sql = 'DELETE FROM CADASTROVEICULO WHERE id_veiculo = ?';

    con.query(sql, [id_veiculo], (err, result) => {
        if(err) {
            console.error('Erro ao excluir cadastro:', err);
            res.status(500).send({success: false, message: 'Erro ao excluir cadastro', error: err.message});
        } else {
            // Verificar se alguma linha foi realmente excluída
            if (result.affectedRows === 0) {
                return res.status(404).send({success: false, message: 'Cadastro não encontrado'});
            }
            res.status(200).send({success: true, message: 'Cadastro excluido com sucesso!', id: result.affectedRows});
        }
    })
});

export default router;


