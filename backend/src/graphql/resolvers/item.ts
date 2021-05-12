import Item from "../../models/item"
import { IResolvers } from 'graphql-tools'
import { MutationAddItemArgs, MutationRemoveItemArgs, ItemResponse, RemoveItemResponse } from '../graphql'
import { IRequest } from "../../interface/IRequest"
import User from "../../models/user"
import { ApolloError, AuthenticationError } from "apollo-server-errors"

export const ItemResolvers: IResolvers = {
    Query: {
        async items(_: void, args: void, req: IRequest): Promise<ItemResponse[]> {
            try {
                if (!req.isAuth) throw new AuthenticationError("please login")
                const items: any = await Item.findAll({ where: { user_id: req.userId }, include: { model: User, as: "creator" }, order: [["id", "DESC"]] });
                return items;
            } catch (error) {
                throw new ApolloError(error)
            }
        }
    },
    Mutation: {
        async addItem(_: void, args: MutationAddItemArgs, req: IRequest): Promise<ItemResponse> {
            try {
                if (!req.isAuth) throw new Error("unauthenticated");
                const { title } = args;

                const item = await Item.create({ title, user_id: req.userId });
                const user = await User.findOne({ where: { id: req.userId }, attributes: ["name"] });

                return { id: item.id, title: item.title, creator: user, createdAt: String(item.createdAt) }

            } catch (error) {
                throw error;
            }
        },
        async removeItem(_: void, args: MutationRemoveItemArgs, req: IRequest): Promise<RemoveItemResponse> {
            try {
                if (!req.isAuth) throw new Error("unauthenticated");
                const { itemId } = args;

                const item = await Item.findOne({ where: { id: itemId } });

                if (!item) throw new Error("Item not found");

                if (item.user_id !== req.userId) throw new Error("you are not allowed to perform this operation");

                const removedItem = await Item.destroy({ where: { id: itemId } });

                if (removedItem < 1) throw new Error("unable to delete item");

                return { id: item.id, title: item.title }

            } catch (error) {
                throw error;
            }
        }
    }
}