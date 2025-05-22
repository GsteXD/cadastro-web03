import { Endereco } from "../models/endereco.model";

export class EnderecoRepository {
    async criarEndereco(dados: {
        tipo: string;
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        id_usuario: number;
    }) {
        return await Endereco.create(dados);
    }

    async getEnderecoById(id_usuario: number) {
        return await Endereco.findAll({ where: { id_usuario: id_usuario } });
    }
}