import express from "express";
import cadastroRouter from './routes/veiculos.js';
import usuarioRouter from './routes/usuario.js';
import loginRouter from './routes/login.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS (inclui preflight OPTIONS)
// CORS (Cross-Origin Resource Sharing - Compartilhamento de recursos de origem cruzada)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Permitir localhost em qualquer porta comum (80, 8080, etc) ou usar a origem da requisição
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*'); // Fallback para permitir qualquer origem
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
    res.status(200).send({ 
        success: true, 
        message: 'Servidor está funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Log para debug - verificar todas as requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use(cadastroRouter);
app.use(usuarioRouter);
app.use(loginRouter);

// Middleware para tratar rotas não encontradas (404) - sempre retorna JSON
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.path,
        method: req.method
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('=================================');
    console.log('Teste a rota: http://localhost:3000/test');
});
