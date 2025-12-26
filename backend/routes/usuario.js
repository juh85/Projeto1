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

// Rota para excluir um usuário
router.delete("/excluirUsuario/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;

    // Validar se o ID é um numero valido
    if(!id_usuario || isNaN(id_usuario)) {
        return res.status(400).send({ success: false, message: "Id do usuário inválido"});
    }
    const sqlU = "DELETE FROM USUARIO WHERE id_usuario = ?";
    con.query(sqlU, [id_usuario], (err, result) => {
        if(err) {
            console.error("Erro ao excluir usuário:", err);
            res.status(500).send({ success: false, message: "Erro ao excluir usuário", error: err.message});
        } else {
            // Verificar se alguma linha foi realmente excluida
            if(result.affectedRows === 0) {
                return res.status(404).send({ success: false, message: "Usuário não encontrado" });
            }
            res.status(200).send({ success: true, message: "Usuário excluido com sucesso!", id: result.affectedRows});
        }
    });
});


// Rota para buscar um usuário
router.get("/buscarUsuario/id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;

    const sqlU = "SELECT * FROM USUARIO WHERE id_usuario = ?";

    con.query(sqlU, [id_usuario], (err, result) => {
        if(err) {
            console.error("Erro ao buscar usuário:", err);
            res.status(500).send({ success: false, message: "Erro ao buscar usuário", error: err.message});
        } else if (result.length === 0) {
            res.status(404).send({ success: false, message: "Usuário não encontrado"});
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// Rota para atualizar um usuário
router.put("/atualizarUsuario/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;
    const dadosU = req.body;

    const sqlU = `UPDATE USUARIO SET
    EMAIL = '${dadosU.email}',
    SENHA = '${dadosU.senha}',
    NOME = '${dadosU.name}',
    CPF = '${dadosU.cpf}',
    CARGO = '${dadosU.cargo}'
    WHERE ID_USUARIO = ${id_usuario}`;

    con.query(sqlU, (err, result) => {
        if(err) {
            res.status(500).send({ success: false, message: "Erro ao atualizar usuário", error: err.message});
        } else if (result.affectedRows === 0) {
            result.status(404).send({ success: false, message: "Usuário não encontrado"});
        } else {
            res.status(200).send({ success: true, message: "Usuário atualizado com sucesso!", id: result.affectedRows});
        }
    });
});


export default router;


