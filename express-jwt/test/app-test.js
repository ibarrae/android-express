import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../src/app'

chai.use(chaiHttp)

const testRequest = chai.request(server).post('/api/login')

describe('/api/login', () => {
  describe('when not sending headers', () => {
    it('should respond with status 400', (done) => {
      testRequest.end((_err, res) => {
        expect(res).to.have.status(400)
      })
      done()
    })
  })
})
