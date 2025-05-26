import { Pedido } from "../models/pedido.model";

export class PedidoRepository {
    async criarPedido(dados: any) {
        return await Pedido.create(dados);
    }

    async getAllPedidos() {
        return await Pedido.findAll();
    }

    async getPedidoById(id: number) {
        return await Pedido.findByPk(id);
    }
}