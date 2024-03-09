import express from 'express'
import { authenticateUser, isAdmin } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable-v2'
import { createProduct, deleteProduct, getAllProduct, getPhoto, getProduct, getSimilarProducts, updateProduct } from '../controllers/productController.js'
const router = express.Router()

// router.post('/create-product', authenticateUser, isAdmin, formidable(), createProduct)
// router.post('/update-category/:id', authenticateUser, isAdmin, updateProduct)
// router.delet('/delete-Prupdate/:id', authenticateUser, isAdmin, deleteProduct)
// router.get('/', getAllProduct)
// router.get('/:slug', getProduct)

router.route('/').get(getAllProduct).post(authenticateUser, isAdmin, formidable(), createProduct);
router.route('/:slug').get(getProduct);
router.route('/:id').all(authenticateUser, isAdmin).put(formidable(), updateProduct).delete(deleteProduct).get(getPhoto);
router.route('/photo/:id').get(getPhoto);
router.route('/:pid/:cid').get(getSimilarProducts);




export default router