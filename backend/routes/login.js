import express from "express";
import con from "../conexao.js";

const router = express.Router();

//Rota para validação de login (email e senha)
router.post("/login", (req, res) => {
  console.log("=== ROTA LOGIN CHAMADA ===");
  console.log("Body recebido:", req.body);
  console.log("Headers:", req.headers);
  
  const { email, senha } = req.body;

  console.log("Tentativa de login:", { email });

  // Validar se o email e a senha foram enviados
  if (!email || !senha) {
    console.log("Email ou senha não fornecidos");
    return res.status(400).send({
      success: false,
      message: "Email e senha são obrigatórios",
    });
  }

  console.log("Dados recebidos:", { email, senha });

 
  const sql = "SELECT * FROM USUARIO WHERE email = ?";

  console.log("Executando query SQL:", sql, "com email:", email);
  
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error("=== ERRO NA CONSULTA ===");
      console.error("Erro completo:", err);
      console.error("Código do erro:", err.code);
      console.error("Mensagem:", err.message);
      
      // Tentar com nome da tabela em minúsculo se falhar
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log("Tentando com tabela 'usuario' (minúsculo)...");
        const sqlLower = "SELECT * FROM usuario WHERE email = ?";
        con.query(sqlLower, [email], (err2, result2) => {
          if (err2) {
            return res.status(500).send({
              success: false,
              message: "Erro na consulta: " + err2.message,
            });
          }
          processarResultado(result2, email, senha, res);
        });
        return;
      }
      
      return res.status(500).send({
        success: false,
        message: "Erro na consulta: " + err.message,
      });
    }

    processarResultado(result, email, senha, res);
  });
});

// Função auxiliar para processar o resultado da consulta
function processarResultado(result, email, senha, res) {
  console.log("Resultado da query:", result);
  console.log("Número de registros encontrados:", result.length);
  
  // verificar se encontrou algum registro
  if (result.length > 0) {
    const usuario = result[0];
    console.log("Usuário encontrado no banco:");
    console.log("- Email:", usuario.email);
    console.log("- Nome:", usuario.nome);
    console.log("- Senha no banco (primeiros 3 chars):", usuario.senha ? usuario.senha.substring(0, 3) + "..." : "null");
    console.log("- Senha digitada (primeiros 3 chars):", senha ? senha.substring(0, 3) + "..." : "null");

    // Verificar a senha - comparar em texto plano
    if (usuario.senha === senha) {
      // login bem-sucedido
      console.log("=== LOGIN REALIZADO COM SUCESSO ===");
      console.log("Login realizado com sucesso para:", usuario.email);

      res.status(200).send({
        success: true,
        message: "Login realizado com sucesso!",
        usuario: {
          nome: usuario.nome,
          email: usuario.email,
          id: usuario.id,
        },
      });
    } else {
      console.log("=== SENHA INCORRETA ===");
      console.log("Senha no banco:", usuario.senha);
      console.log("Senha digitada:", senha);
      console.log("Comparação:", usuario.senha === senha);
      res.status(401).send({
        success: false,
        message: "Senha incorreta!",
      });
    }
  } else {
    // nenhum registro encontrado
    console.log("=== USUÁRIO NÃO ENCONTRADO ===");
    console.log("Email buscado:", email);
    res.status(401).send({
      success: false,
      message: "Email não encontrado!",
    });
  }
}

// Rota para Logout 
router.post("/logout", (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Logout realizado com sucesso!'
  });
});

// Rota para verificar se o usuário está logado 
router.get('/verificarogin', (req, res) => {
  res.status(200).send({
    logado: false
  });
});

export default router;