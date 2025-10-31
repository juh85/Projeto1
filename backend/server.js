import express from "express";
import cadastroRouter from './routes/cadastro.js';
import usuarioRouter from './routes/usuario.js';
import loginRouter from './routes/login.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS (inclui preflight OPTIONS)
// CORS (Cross-Origin Resource Sharing - Compartilhamento de recursos de origem cruzada)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Rotas
app.use(cadastroRouter);
app.use(usuarioRouter);
app.use(loginRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
