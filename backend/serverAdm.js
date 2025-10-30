import express from "express";
import session from "express-session";
import crypto from "crypto";
import con from './conexao.js'

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração de sessão
app.use(session({
    secret: 'seu-secret-key-aqui', // Troque por uma chave secreta segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Para produção com HTTPS, use secure: true
}));

// Habilitar CORS para permitir requisições do frontend
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Permitir origens locais (file://, http://localhost)
    if (origin && (origin.includes('localhost') || origin.includes('file://'))) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Importante para sessões
    next();
});



// Rota para validação de login (email e senha)
app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    
    console.log('Tentativa de login:', { email });
    
    // Validar se email e senha foram enviados
    if (!email || !senha) {
        return res.status(400).send({ 
            success: false, 
            message: 'Email e senha são obrigatórios' 
        });
    }

    console.log('Dados recebidos:', { email, senha });
    
    // Primeiro, buscar o usuário apenas por email para verificar se existe
    const sql = 'SELECT * FROM usuario WHERE email = ?';
    
    con.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Erro na consulta:', err);
            return res.status(500).send({ 
                success: false, 
                message: 'Erro na consulta: ' + err.message 
            });
        }
        
        
        // Verificar se encontrou algum registro
        if (result.length > 0) {
            const usuario = result[0];
            console.log('Usuário encontrado no banco:', usuario);
            
            // Verificar a senha - pode estar em MD5 ou texto plano
            const senhaCriptografada = crypto.createHash('md5').update(senha).digest('hex');
            
            // Verificar se a senha digitada (em MD5 ou texto) corresponde à senha do banco
            if (usuario.senha === senha || usuario.senha === senhaCriptografada) {
                // Login bem-sucedido, criar sessão
                req.session.login = true;
                req.session.email_usuario = usuario.email;
                req.session.nome_usuario = usuario.nome;
                req.session.id_usuario = usuario.id;
                
                console.log('Login realizado com sucesso para:', usuario.email);
                
                res.status(200).send({ 
                    success: true, 
                    message: 'Login realizado com sucesso!',
                    usuario: {
                        nome: usuario.nome,
                        email: usuario.email,
                        id: usuario.id
                    }
                });
            } else {
                console.log('Senha incorreta para:', email);
                console.log('Senha no banco:', usuario.senha);
                console.log('Senha digitada (texto):', senha);
                console.log('Senha digitada (MD5):', senhaCriptografada);
                res.status(401).send({ 
                    success: false, 
                    message: 'Senha incorreta!' 
                });
            }
        } else {
            // Nenhum registro encontrado
            console.log('Usuário não encontrado com email:', email);
            res.status(401).send({ 
                success: false, 
                message: 'Email não encontrado!' 
            });
        }
    });
});

// Rota para logout
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ 
                success: false, 
                message: 'Erro ao fazer logout' 
            });
        }
        
        res.status(200).send({ 
            success: true, 
            message: 'Logout realizado com sucesso!' 
        });
    });
});

// Rota para verificar se usuário está logado
app.get("/verificar-login", (req, res) => {
    if (req.session.login) {
        res.status(200).send({ 
            logado: true,
            usuario: {
                email: req.session.email_usuario,
                nome: req.session.nome_usuario,
                id: req.session.id_usuario
            }
        });
    } else {
        res.status(200).send({ 
            logado: false 
        });
    }
});

// Iniciar o servidor
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});