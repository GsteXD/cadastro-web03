import { Pedido } from "../models/pedido.model";

export class PedidoRepository {
    async criarPedido(dados: {
        id_usuario: number;
        total: number;
        forma_pagamento: string;
        metodo_envio: string;
        data: Date;
    }) {
        return await Pedido.create(dados);
    }

    async getAllPedidos() {
        return await Pedido.findAll();
    }

    async getPedidoById(id: number) {
        return await Pedido.findByPk(id);
    }
}