import { UsuarioService } from "../services/usuario.service";
import { Request, Response } from "express";

const usuarioService = new UsuarioService();

export const loginUsuario = async (req: Request, res: Response) => {
    const { emailLogin, senhaLogin } = req.body;

    try {
        const resultado = await usuarioService.autenticarUsuario(emailLogin, senhaLogin);

        if(!resultado.sucesso) {
            return res.status(401).json({ erro: 'Usuario ou senha inválidos' });
        }

        return res.status(200).json({ message: 'Login bem sucedido', usuario: resultado.usuario, token: resultado.token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao realizar o login:' });
    }
};

export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const { 
            fullName,
            email,
            ddd,
            telefone,
            senha,
            documento,
            documento_id
        } = req.body;

        if(!senha) {
            return res.status(400).json({ erro: 'Usuário não possui senha.' });
        }

        const novoUsuario = await usuarioService.criarUsuario({
            fullName,
            email,
            ddd,
            telefone,
            senha,
            documento,
            documento_id
        });
        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar um usuário:', error);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};