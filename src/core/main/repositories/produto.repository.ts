import { Produto } from "../models/produto.models";

export class ProdutoRepository {
    async getAll() {
        return Produto.findAll(); //Método do sequelize
    }

    async getById(id: number) {
        return Produto.findByPk(id); //Método do sequelize
    }
}