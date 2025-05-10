import { Op } from "sequelize";
import { Produto } from "../models/produto.models";

export class ProdutoRepository {
    async getAll() {
        return Produto.findAll(); //Método do sequelize
    }

    async getNome(name: string) {
        return await Produto.findAll({
            where: {
                nome: {
                    // Busca pela palavra chave que se encaixa antes ou depois daquilo que foi digitado
                    [Op.iLike]: `%${name}%` // LIKE %nome%
                }
            },
        });
    }

    async getById(id: number) {
        return Produto.findByPk(id); //Método do sequelize
    }
}