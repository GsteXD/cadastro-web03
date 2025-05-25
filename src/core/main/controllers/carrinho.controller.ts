import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from '../services/produto.service';
import { Request, Response } from 'express';

const carrinhoService = new CarrinhoService();
const produtoService = new ProdutoService();

export const getCesto = (req: Request, res: Response) => {
  res.json(carrinhoService.getCesto());
};

export const addItem = async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { quantidadeAdicionada } = req.body;

  if (!quantidadeAdicionada || quantidadeAdicionada <= 0) {
    return res.status(400).json({ message: 'Quantidade inválida' });
  }

  const produto = await produtoService.getProdutoById(id);
  if (!produto) {
    return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
  }

  const produtoPlano = produto.get({ plain: true }); //Deixa em formato .json
  carrinhoService.addItem(produtoPlano, quantidadeAdicionada);

  return res.status(201).json({ message: 'Item adicionado ao cesto', produto: produtoPlano });
};


export const updateQuantidade = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { novaQuantidade } = req.body;
  carrinhoService.updateQuantidade(id, novaQuantidade);
  return res.json({ message: 'Quantidade atualizada' });
};

export const removeItem = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  carrinhoService.removeItem(id);
  return res.json({ message: `Item com ID ${id} removido do cesto` });
};

export const cleanCesto = (req: Request, res: Response) => {
  carrinhoService.clearCesto();
  return res.json({ message: 'Carrinho limpo!' })
};