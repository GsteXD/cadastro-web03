import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Token extends Model {
    public id!: number;
    public id_usuario!: number;
    public token!: string;
    public expiration!: string;
} 

Token.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expiration: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    modelName: "token",
    tableName: "token",
    timestamps: false
})