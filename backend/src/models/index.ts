import { Sequelize } from "sequelize";
import path from "path";

const sequelize = new Sequelize({dialect: "sqlite", storage: path.join(__dirname,  "/../database/db.sqlite") });

const db = { sequelize, Sequelize };

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default sequelize;
