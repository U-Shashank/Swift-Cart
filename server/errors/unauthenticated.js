import CustomAPIError from "./custom-api.js"

export default class UnauthenticatedError extends CustomAPIError {
    constructor(msg){
        super(msg)
        this.statusCode = 401
    }
}