import express from 'express'
import createError from 'http-errors'
import morgan from 'morgan'
import jwt from 'express-jwt'
import dotenv from 'dotenv'
import { userRoutes } from './routes/user'
import { loginRoute } from './routes/login'

const app = express()

dotenv.config()

app.use(morgan('dev'))

//app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/login'] }))

app.use('/', loginRoute)
app.use('/api', userRoutes)

app.use((_err, _req, _res, next) => {
  next(createError(404, 'Requested resource not found.'))
})

app.use((err, _req, _res, next) => {
  next(createError(500, err))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
