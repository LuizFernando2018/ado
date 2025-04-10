import { clientService } from './controllerLogin.js';
import { mensagemService } from './controllerMensagem.js';
import http from 'http';
import cors from 'cors';

// Configura o CORS para permitir requisições do frontend
const corsMiddleware = cors({
    origin: 'http://127.0.0.1:5500', // Permite apenas o Live Server
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'] // Cabeçalhos permitidos
});

const server = http.createServer(async (req, res) => {
    corsMiddleware(req, res, async () => {
        res.setHeader('Content-Type', 'application/json');

        if (req.url === '/cadastro' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    console.log('Requisição recebida em /cadastro');
                    const { nome, email, senha } = JSON.parse(body);
                    console.log('Dados recebidos:', { nome, email, senha });
                    const novoUsuario = await clientService.criarUsuario(nome, email, senha);
                    console.log('Usuário criado:', novoUsuario);
                    res.writeHead(201);
                    res.end(JSON.stringify(novoUsuario));
                } catch (erro) {
                    console.error('Erro no backend:', erro);
                    res.writeHead(400);
                    res.end(JSON.stringify({ erro: 'Erro ao criar usuário' }));
                }
            });
        } else if (req.url === '/usuarios' && req.method === 'GET') {
            try {
                const usuarios = await clientService.logarUsuario();
                res.writeHead(200);
                res.end(JSON.stringify(usuarios));
            } catch (erro) {
                res.writeHead(500);
                res.end(JSON.stringify({ erro: 'Erro ao buscar usuários' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Rota não encontrada');
        }
    });
});

server.listen(3000, () => console.log('Rodando na porta 3000'));