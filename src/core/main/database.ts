import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('WebApplication', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});