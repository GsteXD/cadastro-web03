export interface Produto {
    id: number;
    nome: string;
    preco: string;
    imagem: string;
    descricao: string;
}

export interface CartItem extends Produto {
    quantidade: number;
    precoNumerico: number; 
}