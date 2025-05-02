import { ProdutoService } from "../services/produto.service";
import { Request, Response } from "express";

const produtoService = new ProdutoService();

export const getProdutos = async (req: Request, res: Response) => {
    const produtos = await produtoService.getProdutos();
    res.json(produtos);
};

export const getProdutoById = async (req: Request<{ id: string }>, res: Response) => {
    const id: number = parseInt(req.params.id, 10); //Converte para número
    const produto = await produtoService.getProdutoById(id);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: `Produto com ${id} não encontrado.` });
    }
}