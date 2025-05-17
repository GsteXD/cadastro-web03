import { UsuarioService } from "../services/usuario.service";
import { Request, Response } from "express";

const usuarioService = new UsuarioService();

export const trocarUsuarioSenha = async (req: Request, res: Response) => {
    const { token, newSenha } = req.body;

    console.log('Senha recebida:',newSenha);

    if (!token || !newSenha) {
        return res.status(400).json({ erro: 'Token ou nova senha não fornecidos' });
    }     

    try {
        const resultado = await usuarioService.resetarSenha(token, newSenha);

        if(!resultado.sucesso) {
            return res.status(404).json({ erro: 'Token não encontrado' });
        }

        return res.status(200).json({ message: 'Senha trocada com sucesso' });

    } catch (error) {
        console.error('Erro ao trocar a senha:', error);
        return res.status(500).json({ erro: 'Erro ao trocar a senha' });
    }
}

export const enviarTokenSenha = async (req: Request, res: Response) => {
    const { emailRecovery } = req.body;

    try {
        const resultado = await usuarioService.enviarToken(emailRecovery);

        if(!resultado.sucesso) {
            return res.status(404).json({ erro: 'Email não encontrado' });
        }

        return res.status(200).json({ message: 'Email enviado' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao enviar o email' });
    }
}

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