export interface itemCarrinho {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    descricao: string;
    quantidade: number;
}

export class CarrinhoRepository {
    private itens: itemCarrinho[] = []

    getAll() {
        return this.itens;
    }

    getById(id: number) {
        return this.itens.find(item => item.id === id);
    }

    adicionar(produto: Omit<itemCarrinho, 'quantidade'>, quantidadeAdicionada: number) {
        const existente = this.getById(produto.id);
    
        if (existente) {
          existente.quantidade += quantidadeAdicionada;
        } else {
          this.itens.push({ ...produto, quantidade: quantidadeAdicionada });
        }
    }
    
    atualizarQuantidade(id: number, novaQuantidade: number) {
    const item = this.getById(id);
    if (!item) return null;

    if (novaQuantidade <= 0) {
        this.remover(id);
        return 'removido';
    }

    item.quantidade = novaQuantidade;
    return item;
    }

    remover(id: number) {
    this.itens = this.itens.filter(item => item.id !== id);
    }

    limpar() {
    this.itens = [];
    }
}