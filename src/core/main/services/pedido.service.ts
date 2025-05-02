import { CarrinhoService } from "./carrinho.service";

interface Pedido {
    id: number;
    itens: any[];
    total: number;
    data: Date;
}

export class PedidoService {
    private pedidos: Pedido[] = [];
    private carrinhoService = new CarrinhoService();

    getPedidos() {
        return this.pedidos;
    }

    getPedidoById(id: number) {
        return this.pedidos.find(p => p.id === id);
    }

    criarPedido() {
        const itens = [...this.carrinhoService.getCesto()];
        const total = itens.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        const novoPedido: Pedido = {
            id: this.pedidos.length + 1,
            itens,
            total,
            data: new Date()
        };
        this.pedidos.push(novoPedido);
        this.carrinhoService.clearCesto();
        return novoPedido;
    }
}