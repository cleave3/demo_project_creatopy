import { Response } from "express";

class ResponseHandler {
    /**
     * success
     * Success response
     *
     * @param {object} res - reponse object
     * @param {boolean} status - response status
     * @param {Number} code - response code 200 | 201
     * @param {array | object} data - response data
     * @param {string} message - response message
     * @return object
     */
    static success(res: Response, status: boolean, code: number, data: any, message: string = "success") {
        return res.status(code).json({ status, code, message, data });
    }

    /**
     * BadRequest
     * failure response
     *
     * @param {object} res - reponse object
     * @param {boolean} status - response status
     * @param {Number} code - response code 400 | 401 | 403 | 404 | 500 ...
     * @param {string} message - response message
     * @return object
     */
    static badRequest(res: Response, status: boolean, code: number, error: string) {
        return res.status(code).json({ status, code, error });
    }
}

export default ResponseHandler;
