import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Usuario extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public ddd!: number;
    public telefone!: string;
    public senha!: string;
    public documento!: string;
    public documento_id!: string;
}

Usuario.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    ddd: { type: DataTypes.CHAR(2), allowNull: false },
    telefone: { type: DataTypes.CHAR(9), allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    documento: { type: DataTypes.STRING, allowNull: false },
    documento_id: { type: DataTypes.STRING, allowNull: false, unique: true } 
    }, {
    sequelize,
    modelName: 'usuarios',
    tableName: 'usuarios',
    timestamps: false
});