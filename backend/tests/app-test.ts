import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../src/app'
import { DbUser } from '../src/models/user'
import { mockUserData, truncateParams } from './utils'
import { withDB } from '../src/models/utils'
import "mocha";

chai.use(chaiHttp)

const serverAgent = chai.request.agent(server)

beforeEach(async done => {
  await DbUser.create(mockUserData);
  done();
})

afterEach(async done => {
  await DbUser.destroy(truncateParams)
  await withDB
      .query('ALTER SEQUENCE jwt_users_id_seq RESTART WITH 1;');
  done();
})

describe('/api/login', () => {
  describe('when not sending headers', () => {
    it('should respond with status 400', done => {
      serverAgent.post('/api/login').end((_err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
  })

  describe('when sending incorrect credentials', () => {
    it('should respond with status 401', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', '123')
        .end((_err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  describe('when sending correct credentials', () => {
    it('should respond with status 200 and with token', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .end((_err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })
})

describe('/api/users', () => {
  describe('when requesting POST with no body', () => {
    it('should respond with status 400', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.post('/api/users')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'application/json')
            .then(response => {
              expect(response).to.have.status(400)
              done()
            })
        })
    })
  })

  describe('when requesting POST with body', () => {
    it('should respond with status 201 and contain correct message', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.post('/api/users')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'application/json')
            .send({ name: 'A', password: 'P', username: 'EI' })
            .then(response => {
              expect(response).to.have.status(201)
              expect(response.body.message).to.equals('User created.')
              done()
            })
        })
    })
  })

  describe('when requesting GET', () => {
    it('should respond with status 200 and contain a list of users', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.get('/api/users')
            .auth(token, { type: 'bearer' })
            .then(response => {
              expect(response).to.have.status(200)
              expect(response.body).to.have.length(2)
              done()
            })
        })
    })
  })
})

describe('/api/users/:id', () => {
  describe('when requesting GET and user is not found', () => {
    it('should respond with status 404', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.get('/api/users/55')
            .auth(token, { type: 'bearer' })
            .then(response => {
              expect(response).to.have.status(404)
              done()
            })
        })
    })
  })

  describe('when requesting GET and user is found', () => {
    it('should respond with status 200', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.get('/api/users/1')
            .auth(token, { type: 'bearer' })
            .then(response => {
              expect(response).to.have.status(200)
              done()
            })
        })
    })
  })

  describe('when requesting PUT with no body and valid user id', () => {
    it('should respond with status 400', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.put('/api/users/1')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'application/json')
            .then(response => {
              expect(response).to.have.status(400)
              done()
            })
        })
    })
  })

  describe('when requesting PUT with body and invalid user id', () => {
    it('should respond with status 404', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.put('/api/users/3')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'application/json')
            .send({ name: 'Esteban Ibarra', username: 'eibarra123' })
            .then(response => {
              expect(response).to.have.status(404)
              done()
            })
        })
    })
  })

  describe('when requesting PUT with body and valid user id', () => {
    it('should respond with status 200 and contain correct message', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.put('/api/users/1')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'application/json')
            .send({ name: 'Esteban Ibarra', username: 'eibarra123' })
            .then(response => {
              expect(response).to.have.status(200)
              expect(response.body.message).to.equals('User updated.')
              done()
            })
        })
    })
  })

  describe('when requesting DELETE for invalid user', () => {
    it('should respond with status 404', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra123', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.del('/api/users/3')
            .auth(token, { type: 'bearer' })
            .then(response => {
              expect(response).to.have.status(404)
              done()
            })
        })
    })
  })

  describe('when requesting DELETE for valid user', () => {
    it('should respond with status 200 and contain correct message', done => {
      serverAgent
        .post('/api/login')
        .auth('eibarra123', 'eibarra')
        .then(res => {
          const { token } = res.body
          return serverAgent.del('/api/users/1')
            .auth(token, { type: 'bearer' })
            .then(response => {
              expect(response).to.have.status(200)
              expect(response.body.message).to.equals('User deleted.')
              done()
            })
        })
    })
  })
})
