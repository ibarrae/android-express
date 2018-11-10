import express from 'express'
import { login } from '../controllers/login'
export const loginRoute = express.Router()

loginRoute.post('/login', login)
