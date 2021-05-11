import User from "../../models/user";
import { IResolvers } from 'graphql-tools'
import { AuthenticateResponse, MutationRegisterArgs, QueryLoginArgs } from '../graphql'
import Helper from "../../utils/helpers";

export const UserResolvers: IResolvers = {
    Query: {
        async login(_: void, args: QueryLoginArgs): Promise<AuthenticateResponse> {
            try {
                const { email, password } = args;

                const user = await User.findOne({ where: { email } });

                if (!user) throw new Error("invalid login credentials");

                if (!Helper.verifyHash(password, user.password)) throw new Error("invalid login credentials");

                return { name: user.name, token: Helper.genToken({ id: user.id }) }
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        async register(_: void, args: MutationRegisterArgs): Promise<AuthenticateResponse> {
            try {
                const { name, email, password } = args;

                const exist = await User.findOne({ where: { email } });

                if (exist) throw new Error("email already exists");

                const user = await User.create({ name, email, password })

                return { name: user.name, token: Helper.genToken({ id: user.id }) }
            } catch (error) {
                throw error;
            }
        }
    }
}
