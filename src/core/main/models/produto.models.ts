import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Produto extends Model {
    public id!: number;
    public nome!: string;
    public preco!: string;
    public imagem!: string;
    public descricao!: string; 
}

Produto.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.STRING, allowNull: false },
    imagem: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    }, {
    sequelize,
    modelName: 'produto', //Nome interno
    tableName: 'produtos', //Nome externo (bd)
    timestamps: false,
});