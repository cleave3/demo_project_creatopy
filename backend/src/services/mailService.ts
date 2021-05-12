import nodemailer from "nodemailer";

/**
 *
 * @param {String} recipient - Email recipient
 * @param {String} subject - Email Subject
 * @param {String} message - Email Body
 * @returns {void}
 */
export const sendMail = async (recipient: string, subject: string, message: string, from = "ItemApp"): Promise<void> => {
    try {
        if (!/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i.test(recipient)) return;
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_SENDER || from,
            to: recipient,
            subject: subject,
            html: message,
        });
    } catch ({ message }) {
        console.trace(message);
    }
}

export const passwordresetTemplate = (recipient: string, token: number) => {
    return `<p>Hello ${recipient},</p>
      <p>You are receiving this mail because you have requested to reset your password.</p> 
            <p>Use this token <h1><b>${token}</b></h1> to reset your password</p>
        <p>If this was not requested by you, please ignore this mail</p>
      <p>Note: This token expires in 10 minutes</p>
      <p>Thanks`;
}