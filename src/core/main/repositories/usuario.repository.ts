import { Token } from "../models/token.model";
import { Usuario } from "../models/usuario.model";

export class UsuarioRepository {
    async criarUsuario(dados: {
        nome: string;
        email: string;
        ddd: string;
        telefone: string;
        senha: string;
        documento: string;
        documento_id: string;
    }) {
        return await Usuario.create(dados);
    }

    async getToken(token: string) {
        return await Token.findOne({ where: {token} })
    }

    async removerToken(token: string) {
        return await Token.destroy({ where: {token} })
    }

    async trocarSenha(userId: number, newSenha: string) {
        return await Usuario.update({ senha: newSenha }, { where: {id: userId} })
    }

    async setResetToken(userId: number, token: string, expiresAt: Date) {
        console.log(expiresAt);

        return await Token.create({
            id_usuario: userId,
            token,
            expiration: expiresAt.toISOString()
        })
    }

    async getById(id: number) {
        return Usuario.findByPk(id);
    }

    async getByEmail(email: string) {
        return Usuario.findOne({ where: { email } })
    }
}