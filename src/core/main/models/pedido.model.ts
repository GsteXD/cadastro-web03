import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export class Pedido extends Model {
    public id!: number;
    public id_usuario!: number;
    public total!: number;
    public forma_pagamento!: string;
    public metodo_envio!: string;
    public data!: string;
    public itens!: any;
    public id_endereco!: number;
}

Pedido.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
    formaPgto: { type: DataTypes.STRING, allowNull: false },
    metodoEnvio: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.STRING, allowNull: false },
    itens: { type: DataTypes.JSON, allowNull: false },
    id_endereco: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'pedidos',
    tableName: 'pedidos',
    timestamps: false
});