import JWT from 'jsonwebtoken'
import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import User from '../models/User.js'
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        throw new UnauthenticatedError("Authentication Invalid")
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = payload
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")
    }

    next()
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if(user.role !== 1) {
        throw new UnauthorizedError("Unauthorized to access this route")
    }

    next()
}

export {
    authenticateUser,
    isAdmin
}