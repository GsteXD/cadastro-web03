import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as carrinhoController from './controllers/carrinho.controller';
import * as produtoController from './controllers/produto.controller';
import * as pedidoController from './controllers/pedido.controller';
import * as usuarioController from './controllers/usuario.controller';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Rotas da API ================================================
app.get('/api/cesto', carrinhoController.getCesto);
app.post('/api/cesto/:id', carrinhoController.addItem);
app.patch('/api/cesto/:id', carrinhoController.updateQuantidade);
app.delete('/api/cesto/:id', carrinhoController.removeItem);
app.delete('/api/cesto', carrinhoController.cleanCesto);

app.get('/api/produtos', produtoController.getProdutos);
app.get('/api/produtos/:id', produtoController.getProdutoById);

app.get('/api/pedidos', pedidoController.getPedidos);
app.get('/api/pedidos/:id', pedidoController.getPedidoById);
app.post('/api/pedidos', pedidoController.criarPedido);

app.post('/api/usuario/login', usuarioController.loginUsuario);
app.post('/api/usuario/cadastrar', usuarioController.criarUsuario);

// Tratamento para arquivos estáticos não encontrados
app.get(['*.js', '*.css', '*.ico', '*.png', '*.jpg', '*.jpeg', '*.svg'], (req, res) => {
  console.warn('Arquivo estático não encontrado:', req.url);
  res.status(404).end();
});

// Fallback, caso dê algum erro
app.get('*', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch((error) => {
      console.error('Erro no Angular Universal:', error);
      res.status(500).send('Erro interno no servidor');
    });
});

// Inicialização do servidor
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);