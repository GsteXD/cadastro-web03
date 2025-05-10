import { ProdutoService } from "../services/produto.service";
import { Request, Response } from "express";

const produtoService = new ProdutoService();

export const getProdutos = async (req: Request, res: Response) => {
    const produtos = await produtoService.getProdutos();
    res.status(200).json(produtos);
};

export const getProdutoNome = async (req: Request, res: Response) => {
    try {
        const nome = req.query["nome"] as string;

        if(!nome) {
            return res.status(400).json({ message: 'É necessário passar o nome do produto.' });
        }

        const query = await produtoService.getProdutoNome(nome);

        if (query.length > 0) { // Verifica se o array não é vazio
            return res.status(200).json({ message: 'Produtos encontrados:', query });
        } else {
            // Retornou, mas vazio 
            return res.status(200).json({ message: 'Nenhum produto encontrado.' });
        }

    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getProdutoById = async (req: Request<{ id: string }>, res: Response) => {
    const id: number = parseInt(req.params.id, 10); //Converte para número
    const produto = await produtoService.getProdutoById(id);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: `Produto com ${id} não encontrado.` });
    }
}