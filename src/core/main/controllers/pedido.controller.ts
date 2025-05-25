import { PedidoService } from "../services/pedido.service";
import { Request, Response } from "express";

const pedidoService = new PedidoService();

export const criarPedido = async (req: Request, res: Response) => {
    try {
        const{ total, formaPgto, data, metodoEnvio } = req.body;
        const { id: id_usuario } = req.user || {};

        if (!req.user || !req.user.id) {
            return res.status(400).json({ erro: 'Usuário não autenticado' });
        }

        return res.status(201).json(await pedidoService.criarPedido(req.body, req.user.id));

    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({ erro: 'Erro ao criar o pedido' });
    }
}