import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize: Sequelize = new Sequelize({ dialect: config.dialect, storage: config.storage });

const db = { sequelize, Sequelize };

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default sequelize;
