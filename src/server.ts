import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const cesto: any[] = [];
const pedido: any[] = [];

app.use(express.json());

const produtos = [
  [
    { id: 1, nome: 'Produto 1', preco: 'R$ 99,00', imagem: '/assets/images/produtos/Mask1.gif', descricao: 'Quando é necessário demonstrar neutralidade.' },
    { id: 2, nome: 'Produto 2', preco: 'R$ 89,00', imagem: '/assets/images/produtos/Mask2.gif', descricao: 'Destemido, mas ao mesmo tempo descolado.' },
    { id: 3, nome: 'Produto 3', preco: 'R$ 79,00', imagem: '/assets/images/produtos/Mask3.gif', descricao: 'Ele pode ferir seus sentimentos.' }
  ],
  [
    { id: 4, nome: 'Produto 4', preco: 'R$ 120,00', imagem: '/assets/images/produtos/Mask4.gif', descricao: 'Um coelho? Um urso? Apenas saiba que roxo nunca é uma boa cor.' },
    { id: 5, nome: 'Produto 5', preco: 'R$ 110,00', imagem: '/assets/images/produtos/Mask5.gif', descricao: 'Fácil de ler, mas também aberto a todos.' },
    { id: 6, nome: 'Produto 6', preco: 'R$ 99,90', imagem: '/assets/images/produtos/Mask6.gif', descricao: 'A vida tem seus momentos felizes... às vezes.' }
  ]
];

// Endpoint para retornar os produtos
app.get('/api/produtos', (req, res) => {
  res.json(produtos); // Retorna os produtos como JSON
});

//GETs ==============================================================
app.get('/api/produtos/:id', (req, res) => { //Produto
  const id = parseInt(req.params.id, 10); // Converte o ID para número
  const produto = produtos.flat().find((p) => p.id === id); // Busca o produto no array bidimensional

  if (produto) {
    res.json(produto); 
  } else {
    res.status(404).json({ message: `Produto com ID ${id} não encontrado.` }); 
  }
});
app.get('/api/cesto', (req, res) => { //Cesto
  res.json(cesto);
});

app.get('/api/pedidos', (req, res) => { //Pedido
  res.json(pedido); // --> Recupera todos
});
app.get('/api/pedido/:id', (req, res) => {
  const { id } = req.params;
  const pedidos = pedido.find((p) => p.id === parseInt(id, 10)); // --> Recupera um específico
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({message: `Pedido com o ID ${id} não encontrado` });
  }
});

//POST ==============================================================
app.post('/api/cesto', (req, res) => { //Cesto
  const item = req.body;
  cesto.push(item);
  res.status(201).json({ message: 'Item adicionado ao cesto', item });
});

app.post('/api/pedidos', (req, res) => { //Pedido
  const pedidos = {
    id: pedido.length + 1,
    itens: [...cesto], // Copia os itens do cesto
    total: cesto.reduce((sum, item) => sum + item.preco * item.quantidade, 0),
    data: new Date(),
  };
  pedido.push(pedidos);
  cesto.length = 0; // Limpa o cesto após criar o pedido
  res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
});

//DELETE ==============================================================
app.delete('/api/cesto/:id', (req, res) => { //Cesto
  const { id } = req.params;
  const index = cesto.findIndex((item) => item.id === parseInt(id, 10));
  if (index !== -1) {
    cesto.splice(index, 1);
    res.json({ message: `Item com ID ${id} removido do cesto` });
  } else {
    res.status(404).json({ message: `Item com ID ${id} não encontrado` });
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use('*', (req, res, next) => {
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


/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
