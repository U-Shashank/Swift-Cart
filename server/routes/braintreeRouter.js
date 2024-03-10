import express from 'express'
import { authenticateUser, isAdmin } from '../middlewares/authMiddleware.js'
import { braintreePayment, braintreeToken } from '../controllers/productController.js'
const router = express.Router()


router.route('/').all(authenticateUser).get(braintreeToken).post(braintreePayment);




export default router