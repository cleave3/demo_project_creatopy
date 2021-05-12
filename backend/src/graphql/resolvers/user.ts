import User from "../../models/user";
import { IResolvers } from 'graphql-tools'
import {
    AuthenticateResponse,
    MutationRegisterArgs,
    QueryLoginArgs,
    MutationForgotPasswordArgs,
    ForgotPasswordResponse,
    MutationResetPasswordArgs,
    ResetPasswordResponse
} from '../graphql'
import Helper from "../../utils/helpers";
import { passwordresetTemplate, sendMail } from "../../services/mailService";
import { IRequest } from "../../interface/IRequest";

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
        },
        async forgotPassword(_: void, args: MutationForgotPasswordArgs): Promise<ForgotPasswordResponse> {
            try {
                const { email } = args;

                const exist = await User.findOne({ where: { email } });

                if (!exist) throw new Error("user not found");

                const resettoken = Math.floor(Math.random() * 100000 + 999999);
                const tokenexpiration = new Date().getTime() + 600000;

                await User.update({ resettoken, tokenexpiration }, { where: { email } });

                const message = passwordresetTemplate(exist.name, resettoken);

                await sendMail(email, "Password Reset", message);

                return { token: Helper.genToken({ id: exist.id }), message: "token sent" }
            } catch (error) {
                throw error;
            }
        },
        async resetPassword(_: void, args: MutationResetPasswordArgs, req: IRequest): Promise<ResetPasswordResponse> {
            try {
                if (!req.isAuth) throw new Error("unauthenticated");
                const { resettoken, password } = args;

                const exist = await User.findOne({ where: { id: req.userId } });

                if (!exist) throw new Error("user not found");

                if (Number(exist.resettoken) === 0) throw new Error("Invalid password reset token");
                if (Number(exist.resettoken) !== Number(resettoken)) throw new Error("Invalid password reset token");

                const now = new Date().getTime();

                if (now > Number(exist.tokenexpiration)) throw new Error("Password reset token is expired");

                const newpassword = Helper.genHash(password)
                const updateuser = await User.update({ resettoken: 0, tokenexpiration: 0, password: newpassword }, { where: { id: req.userId } });

                if (!updateuser) throw new Error("password reset failed");

                return { message: "reset-sucessful" }
            } catch (error) {
                throw error;
            }
        },
    }
}
