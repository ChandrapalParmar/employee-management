import express from "express"
import { login ,verifyToken, registerAdmin} from "../controllers/authController.js" 
import authMiddleware from '../middleware/authMiddleware.js'

const router= express.Router()

router.post('/login',login)
router.post('/register-admin', registerAdmin) 
router.get('/verify',authMiddleware, verifyToken)

export default router