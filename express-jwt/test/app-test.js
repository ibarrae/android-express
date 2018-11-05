import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../src/app'
import { User } from '../src/models/user'

chai.use(chaiHttp)

describe('/api/login', () => {
  before((done) => {
    User.create({
      name: 'Esteban',
      username: 'eibarra',
      password: 'eibarra',
      created_at: Date.now()
    }).then(_user => done())
  })

  after((done) => {
    User.destroy({
      where: {},
      truncate: true
    }).then(_user => done())
  })

  describe('when not sending headers', () => {
    it('should respond with status 400', (done) => {
      chai.request(server).post('/api/login').end((_err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
  })

  describe('when sending incorrect credentials', () => {
    it('should respond with status 401', (done) => {
      chai.request(server).post('/api/login').auth('eibarra', '123').end((_err, res) => {
        expect(res).to.have.status(401)
        done()
      })
    })
  })

  describe('when sending correct credentials', () => {
    it('should respond with status 200 and with token', (done) => {
      chai.request(server).post('/api/login').auth('eibarra', 'eibarra').end((_err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('token')
        done()
      })
    })
  })
})
