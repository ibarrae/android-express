import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import { server } from '../src/app'
import { User } from '../src/models/user'
import { mockUserData, truncateParams } from './utils'
import { jwtSecret } from '../src/utils/environment';

chai.use(chaiHttp)

describe('/api/login', () => {
  before(done => {
    User.create(mockUserData).then(_user => done())
  })

  after(done => {
    User.destroy(truncateParams).then(_user => done())
  })

  describe('when not sending headers', () => {
    it('should respond with status 400', done => {
      chai.request(server).post('/api/login').end((_err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
  })

  describe('when sending incorrect credentials', () => {
    it('should respond with status 401', done => {
      chai.request(server).post('/api/login').auth('eibarra', '123').end((_err, res) => {
        expect(res).to.have.status(401)
        done()
      })
    })
  })

  describe('when sending correct credentials', () => {
    it('should respond with status 200 and with token', done => {
      chai.request(server).post('/api/login').auth('eibarra', 'eibarra').end((_err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('token')
        done()
      })
    })
  })
})

describe('/api/users', () => {
  let token
  beforeEach(done => {
    User.create(mockUserData).then(user => {
      token = jwt.sign({ user }, jwtSecret)
      done()
    })
  })

  afterEach(done => {
    User.destroy(truncateParams).then(_user => done())
  })

  describe('when sending POST with no body', () => {
    it('should respond with status 400', done => {
      chai.request(server).post('/api/users')
        .auth(token, { type: 'bearer' })
        .set('Content-Type', 'application/json')
        .end((_err, res) => {
          expect(res).to.have.status(400)
          done()
        })
    })
  })
  describe('when sending POST with body', () => {
    it('should respond with status 201', done => {
      chai.request(server).post('/api/users')
        .auth(token, { type: 'bearer' })
        .set('Content-Type', 'application/json')
        .send({ name: 'A', password: 'P', username: 'EI' })
        .end((_err, res) => {
          expect(res).to.have.status(201)
          done()
        })
    })
  })
})
