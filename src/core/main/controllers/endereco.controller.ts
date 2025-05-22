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

        return res.status(201).json(await enderecoService.criarEndereco(req.body, req.user.id));
        
    } catch (error) {
        console.error('Erro na criação do endereço:', error);
        return res.status(500).json({ erro: 'Erro ao criar o endereço' });
    }
}

export const listarEnderecos = async (req: Request, res: Response) => {
    try{
        if (!req.user || !req.user.id) {
            return res.status(400).json({ erro: 'Usuário não autenticado' })
        }

        return res.status(200).json(await enderecoService.listarEnderecos(req.user.id));

    } catch (error) {
        console.error('Erro ao listar endereços:', error);
        return res.status(500).json({ erro: 'Erro ao listar endereços'})
    }
}