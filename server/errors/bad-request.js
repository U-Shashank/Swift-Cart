import CustomAPIError from "./custom-api.js"

export default class BadRequestError extends CustomAPIError {
    constructor(msg){
        super(msg)
        this.statusCode = 400 
    }
}