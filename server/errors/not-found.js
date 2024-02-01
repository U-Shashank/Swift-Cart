import CustomAPIError from "./custom-api.js"

export default class NotFoundError extends CustomAPIError {
    constructor(msg){
        super(msg)
        this.statusCode = 404 
    }
}