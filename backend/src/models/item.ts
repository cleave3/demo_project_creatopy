import { Model, DataTypes, Optional } from "sequelize";
import sequelize from ".";

interface ItemAttributes {
    id: number;
    title: string;
    user_id: number;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> { }

interface ItemInstance extends Model<ItemAttributes, ItemCreationAttributes>, ItemAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Item = sequelize.define<ItemInstance>("Item", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    }
})

export default Item;