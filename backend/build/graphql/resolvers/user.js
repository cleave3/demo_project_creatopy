"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = void 0;
const user_1 = __importDefault(require("../../models/user"));
const helpers_1 = __importDefault(require("../../utils/helpers"));
const mailService_1 = require("../../services/mailService");
exports.UserResolvers = {
    Query: {
        login(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email, password } = args;
                    const user = yield user_1.default.findOne({ where: { email } });
                    if (!user)
                        throw new Error("invalid login credentials");
                    if (!helpers_1.default.verifyHash(password, user.password))
                        throw new Error("invalid login credentials");
                    return { name: user.name, token: helpers_1.default.genToken({ id: user.id }) };
                }
                catch (error) {
                    throw error;
                }
            });
        }
    },
    Mutation: {
        register(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { name, email, password } = args;
                    const exist = yield user_1.default.findOne({ where: { email } });
                    if (exist)
                        throw new Error("email already exists");
                    const user = yield user_1.default.create({ name, email, password });
                    return { name: user.name, token: helpers_1.default.genToken({ id: user.id }) };
                }
                catch (error) {
                    throw error;
                }
            });
        },
        forgotPassword(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email } = args;
                    const exist = yield user_1.default.findOne({ where: { email } });
                    if (!exist)
                        throw new Error("user not found");
                    const resettoken = Math.floor(Math.random() * 100000 + 999999);
                    const tokenexpiration = new Date().getTime() + 600000;
                    yield user_1.default.update({ resettoken, tokenexpiration }, { where: { email } });
                    const message = mailService_1.passwordresetTemplate(exist.name, resettoken);
                    yield mailService_1.sendMail(email, "Password Reset", message);
                    return { token: helpers_1.default.genToken({ id: exist.id }), message: "token sent" };
                }
                catch (error) {
                    throw error;
                }
            });
        },
        resetPassword(_, args, req) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!req.isAuth)
                        throw new Error("unauthenticated");
                    const { resettoken, password } = args;
                    const exist = yield user_1.default.findOne({ where: { id: req.userId } });
                    if (!exist)
                        throw new Error("user not found");
                    if (Number(exist.resettoken) === 0)
                        throw new Error("Invalid password reset token");
                    if (Number(exist.resettoken) !== Number(resettoken))
                        throw new Error("Invalid password reset token");
                    const now = new Date().getTime();
                    if (now > Number(exist.tokenexpiration))
                        throw new Error("Password reset token is expired");
                    const newpassword = helpers_1.default.genHash(password);
                    const updateuser = yield user_1.default.update({ resettoken: 0, tokenexpiration: 0, password: newpassword }, { where: { id: req.userId } });
                    if (!updateuser)
                        throw new Error("password reset failed");
                    return { message: "reset-sucessful" };
                }
                catch (error) {
                    throw error;
                }
            });
        },
    }
};
