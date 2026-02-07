const express = require('express');
const cors = require('cors');
const app = express();

// Configuração robusta de CORS para aceitar credenciais do frontend
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Mock de Token JWT Válido (Expira em 2100)
const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQxMDI0NDQ4MDAsIm5hbWUiOiJEZXZPcHMgQ2FuZGlkYXRlIiwiaWQiOjF9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// 1. Rota de Login
app.post('/auth/login', (req, res) => {
    res.json({
        data: {
            accessToken: MOCK_TOKEN,
            user: { id: 1, name: "Candidato EZOps", email: req.body.email }
        }
    });
});

// 2. Rota de Usuário Atual (Chamada pelo middleware.js do Vue)
app.get('/users/current', (req, res) => {
    res.json({
        data: { id: 1, name: "Candidato EZOps", email: "user@user.com" }
    });
});

// 3. Rota de Refresh Token (Evita o erro 404 no auth.service.js)
app.post('/auth/refresh-tokens', (req, res) => {
    res.json({
        data: { accessToken: MOCK_TOKEN }
    });
});

// Rotas originais da aplicação de posts
app.use('/', require('./route/postsRoute'));

// Middleware de tratamento de erro
app.use(function (error, req, res, next) {
    res.status(500).send(error.message);
});

app.listen(3000, () => {
    console.log('Backend pronto para o exame na porta 3000');
});