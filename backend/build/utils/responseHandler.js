"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    static success(res, status, code, data, message = "success") {
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
    static badRequest(res, status, code, error) {
        return res.status(code).json({ status, code, error });
    }
}
exports.default = ResponseHandler;
