import { ProdutoRepository } from '../repositories/produto.repository';

export class ProdutoService {
    constructor(private repo = new ProdutoRepository()) {}

    getProdutos() {
        return this.repo.getAll();
    }

    getProdutoNome(nome: string) {
        return this.repo.getNome(nome);
    }

    getProdutoById(id: number) {
        return this.repo.getById(id);
    }
}