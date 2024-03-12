import express from "express"
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js"
import { 
    register,
    login,
    updateUser, 
    } from "../controllers/authController.js"
import { getAllOrders, getOrders, updateOrder } from "../controllers/orderController.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/update-user', authenticateUser, updateUser)
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
router.get('/orders', authenticateUser, getOrders)
router.get('/all-orders', authenticateUser, isAdmin, getAllOrders)
router.patch('/order/:id', authenticateUser, isAdmin, updateOrder)

export default router