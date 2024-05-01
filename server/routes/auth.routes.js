import express from 'express'
import { signin } from '../controllers/auth.controllers'

const router = express.Router()

router.get('/signin',signin)



export default router