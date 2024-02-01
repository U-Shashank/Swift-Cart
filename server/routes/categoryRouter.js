import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from '../controllers/categoryController.js'
import { authenticateUser, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.post('/create-category', authenticateUser, isAdmin, createCategory)
// router.post('/update-category/:id', authenticateUser, isAdmin, updateCategory)
// router.post('/delete-category/:id', authenticateUser, isAdmin, deleteCategory)
// router.get('/', getAllCategory)
// router.get('/:slug', getCategory)

router.route('/:id').all(authenticateUser, isAdmin).
    put(updateCategory).
    delete(deleteCategory)
router.route('/').get(getAllCategory).post(authenticateUser, isAdmin, createCategory)
router.route('/:slug').get(getCategory)
    


export default router