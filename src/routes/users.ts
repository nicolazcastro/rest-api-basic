import express from 'express'
import { register } from '../Controllers/userController'

const router = express.Router()

router.route('/register').post(register)

export default router
