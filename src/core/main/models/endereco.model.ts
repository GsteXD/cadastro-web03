import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Endereco extends Model {
    public id!: number;
    public tipo!: string;
    public cep!: string;
    public rua!: string;
    public numero!: string;
    public bairro!: string;
    public cidade!: string;
    public estado!: string;
    public id_usuario!: number;
}

Endereco.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.STRING, allowNull: false },
    cep: { type: DataTypes.CHAR(8), allowNull: false },
    rua: { type: DataTypes.STRING, allowNull: false },
    numero: { type: DataTypes.STRING, allowNull: false },
    bairro: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.CHAR(2), allowNull: false },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'enderecos',
    tableName: 'enderecos',
    timestamps: false
})