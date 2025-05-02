import { Request, Response } from 'express';
import { PedidoService } from '../services/pedido.service';

const pedidoService = new PedidoService();

export const getPedidos = (_req: Request, res: Response) => {
  res.json(pedidoService.getPedidos());
};

export const getPedidoById = async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const pedido = await pedidoService.getPedidoById(id);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ message: `Pedido com o ID ${id} não encontrado` });
  }
};

export const criarPedido = (_req: Request, res: Response) => {
  const novoPedido = pedidoService.criarPedido();
  res.status(201).json({ message: 'Pedido criado com sucesso', pedido: novoPedido });
};