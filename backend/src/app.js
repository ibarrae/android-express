import express from 'express'
import createError from 'http-errors'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import { userRoutes } from './routes/user'
import { loginRoute } from './routes/login'

const app = express()

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/login'] }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', loginRoute)
app.use('/api', userRoutes)

app.use((err, _req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err.message)
  } else {
    res.status(404).send('Requested resource was not found.')
  }
})

app.use((err, _req, _res, next) => {
  next(createError(500, err))
})

export const server = app.listen(3000)
