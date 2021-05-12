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
exports.passwordresetTemplate = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 *
 * @param {String} recipient - Email recipient
 * @param {String} subject - Email Subject
 * @param {String} message - Email Body
 * @returns {void}
 */
const sendMail = (recipient, subject, message, from = "ItemApp") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i.test(recipient))
            return;
        let transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        yield transporter.sendMail({
            from: process.env.MAIL_SENDER || from,
            to: recipient,
            subject: subject,
            html: message,
        });
    }
    catch ({ message }) {
        console.trace(message);
    }
});
exports.sendMail = sendMail;
const passwordresetTemplate = (recipient, token) => {
    return `<p>Hello ${recipient},</p>
      <p>You are receiving this mail because you have requested to reset your password.</p> 
            <p>Use this token <h1><b>${token}</b></h1> to reset your password</p>
        <p>If this was not requested by you, please ignore this mail</p>
      <p>Note: This token expires in 10 minutes</p>
      <p>Thanks`;
};
exports.passwordresetTemplate = passwordresetTemplate;
