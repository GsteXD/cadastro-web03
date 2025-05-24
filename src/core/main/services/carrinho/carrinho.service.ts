import { CarrinhoRepository } from '../../repositories/carrinho.repository'

export class CarrinhoService {
    constructor(private repo = new CarrinhoRepository()) {}

    getCesto() {
        return this.repo.getAll();
    }

    addItem(produto: any, quantidade: number) {
        const existente = this.repo.getById(produto.id);

        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this.repo.adicionar(produto, quantidade);
        }
    }

    updateQuantidade(id: number, quantidade: number) {
        this.repo.atualizarQuantidade(id, quantidade);
    }

    removeItem(id: number) {
        this.repo.remover(id);
    }

    clearCesto() {
        this.repo.limpar();
    }
}