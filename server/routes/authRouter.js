import express from "express"
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    register,
    login, 
    } from "../controllers/authController.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user-auth', authenticateUser, (req, res) => (
    res.status(200).json({
        ok: true
    })
))
router.get('/admin-auth', authenticateUser, isAdmin, (req, res) => (
    res.status(200).json({
        ok: true
    })
))

export default router