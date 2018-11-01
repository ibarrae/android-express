import express from 'express'
import { usersController, getUserController } from '../controllers/user'

export const userRoutes = express.Router()

userRoutes.get('/users', (req, res) => {
  usersController(req, res)
})

userRoutes.route('/users/:id')
  .get((req, res) => {
    getUserController(req, res)
  })
  .put((req, res, next) => {

  })
  .delete((req, res, next) => {

  })
