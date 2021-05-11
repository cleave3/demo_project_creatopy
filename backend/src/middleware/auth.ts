import { NextFunction, Response } from 'express';
import Helper from "../utils/helpers";
import { IRequest } from '../interface/IRequest';

export const checkAuth = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers['token'];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    const decoded = Helper.verifyToken(token);
    if (!decoded) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decoded.id;
    next();
};
