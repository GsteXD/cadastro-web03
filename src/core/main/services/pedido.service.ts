import { PedidoRepository } from "../repositories/pedido.repository";

export class PedidoService {
    constructor(private repo = new PedidoRepository()) {}

    criarPedido(pedido: any, id_usuario: number) {
        if (!pedido) {
            throw new Error("Pedido inválido");
        }
        return this.repo.criarPedido({...pedido, id_usuario});
    }

    buscarPedidoPorId(id: number) {
        if (!id || isNaN(id)) {
            throw new Error("ID de pedido inválido")
        }
        return this.repo.getPedidoById(id);
    }

    listarPedidos() {
        return this.repo.getAllPedidos();
    }
}