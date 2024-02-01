export default class CustomAPIError extends Error {
    constructor(msg) {
        super(msg)
    }
}