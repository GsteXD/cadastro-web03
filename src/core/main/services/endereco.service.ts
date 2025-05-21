import { EnderecoRepository } from "../repositories/endereco.repository";

export class EnderecoService {
    constructor(private repo = new EnderecoRepository()) {}

    async criarEndereco(dados: any, id_usuario: number) {

        if (!dados.cep || !dados.rua) {
            throw new Error('CEP e Rua são obrigatórios');
        }

        return await this.repo.criarEndereco({...dados, id_usuario});
    }

    async getEnderecoById(id_usuario: number) {

        if (!id_usuario) {
            throw new Error('Usuário não autenticado');
        }

        return await this.repo.getEnderecoById(id_usuario);
    }
}