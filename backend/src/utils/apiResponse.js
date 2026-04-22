import { ReasonPhrases } from 'http-status-codes';
class ApiResponse {
    constructor(statusCode, data, message = ReasonPhrases.OK) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse;