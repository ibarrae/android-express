import express from 'express'

export const userRoutes = express.Router()

userRoutes.get('/users', (req, res) => {
  const users = [
    { name: 'Esteban' },
    { name: 'Jaime' }
  ]
  res.status(200).json(users)
})

userRoutes.route('/users/:id')
  .get((req, res, next) => {
    console.warn(req)
  })
  .put((req, res, next) => {

  })
  .delete((req, res, next) => {

  })
