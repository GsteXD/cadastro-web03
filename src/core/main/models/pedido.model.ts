import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export class Pedido extends Model {
    public id!: number;
    public id_usuario!: number;
    public total!: number;
    public forma_pagamento!: string;
    public metodo_envio!: string;
    public data!: Date;
}

Pedido.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
    forma_pagamento: { type: DataTypes.STRING, allowNull: false },
    metodo_envio: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    sequelize,
    modelName: 'pedido',
    tableName: 'pedidos',
    timestamps: false
});