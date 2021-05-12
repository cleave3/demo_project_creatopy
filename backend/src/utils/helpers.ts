import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Helper class
 */
class Helper {

    private static APP_SECRET: string = process.env.APP_SECRET || "appsecret";

    static genToken(payload: object): string {
        return jwt.sign(payload, Helper.APP_SECRET, { expiresIn: "24hr" });
    }

    static verifyToken(token: any): any {
        return jwt.verify(token, Helper.APP_SECRET);
    }

    static verifyHash(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    static genHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

}

export default Helper;

