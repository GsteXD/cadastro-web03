import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcryptjs";

interface cadastroUsuarioDTO {
    nome: string;
    email: string;
    ddd: string;
    telefone: string;
    senha: string;
    documento: string;
    documento_id: string;
}

export class UsuarioService {
    constructor(private repo = new UsuarioRepository()) {}

    async autenticarUsuario(email: string, senha: string) {
        const usuario = await this.repo.getByEmail(email);

        if (!usuario) {
            return { sucesso: false, message: 'Usuário não encontrado' };
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return { sucesso: false, message: 'Senha inválida' };
        }

        return { sucesso: true, usuario };
    }

    async criarUsuario(dados: any) {
        const validarCampos: cadastroUsuarioDTO = {
            nome: dados.fullName,
            email: dados.email,
            ddd: dados.ddd,
            telefone: dados.telefone,
            senha: dados.senha,
            documento: dados.documento,
            documento_id: dados.documento_id
        }

        //Verificação de como os dados estão chegando
        console.log(validarCampos);

        //Validador simples
        if(!validarCampos.nome || !validarCampos.email || !validarCampos.senha || !validarCampos.documento || !validarCampos.documento_id) {
            throw new Error('Dados obrigatórios faltando.');
        }

        let hideSenha;
        try {
            hideSenha = await bcrypt.hash(validarCampos.senha, 10);
        } catch (error) {
            throw new Error("Falha ao criptografar a senha.");
        }

        const novoUsuario = await this.repo.criarUsuario({
            ...validarCampos,
            senha: hideSenha
        });

        return novoUsuario;
    }

    buscarId(id: number) {
        const usuario = this.repo.getById(id);

        if (!usuario) {
            throw new Error('(service)Usuário não encontrado.');
        }

        return usuario;
    }
}