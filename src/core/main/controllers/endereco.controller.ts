import { Request, Response } from "express";
import { EnderecoService } from "../services/endereco.service";

const enderecoService = new EnderecoService();

export const criarEndereco = async (req: Request, res: Response) => {
    try {
        const { tipo, cep, rua, numero, bairro, cidade, estado } = req.body;

        const { id: usuario_id } = req.user || {};

        if (!req.user || !req.user.id) {
            return res.status(400).json({ erro: 'Usuário não autenticado' });
        }

        const novoEndereco = await enderecoService.criarEndereco(req.body, req.user.id);
        return res.status(201).json(novoEndereco);
        
    } catch (error) {
        console.error('Erro na criação do endereço:', error);
        return res.status(500).json({ erro: 'Erro ao criar o endereço' });
    }
}