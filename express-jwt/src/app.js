import express from 'express'
import createError from 'http-errors'
import morgan from 'morgan'

import { userRoutes } from './routes/user'

const app = express()

app.use(morgan('dev'))

app.use('/', userRoutes)

app.use((_err, _req, _res, next) => {
  next(createError(404, 'Requested resource not found.'))
})

app.use((_err, _req, _res, next) => {
  next(createError(500, 'Server internal error.'))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
