import CustomAPIError from "./custom-api.js"

export default class UnauthorizedError extends CustomAPIError {
    constructor(msg){
        super(msg)
        this.statusCode = 403
    }
}