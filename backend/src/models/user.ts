import bcrypt from "bcryptjs";
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from ".";
import Item from "./item";

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>("User", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,    
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
})

User.beforeCreate(user => {
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
})

User.hasMany(Item, { foreignKey: 'user_id', as: 'items' });
Item.belongsTo(User, { foreignKey: "user_id", as: "creator" });

export default User;