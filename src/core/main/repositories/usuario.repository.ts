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

    async getById(id: number) {
        return Usuario.findByPk(id);
    }

    async getByEmail(email: string) {
        return Usuario.findOne({ where: { email } })
    }
}