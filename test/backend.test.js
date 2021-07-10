/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const app = require('../index')

chai.expect()
chai.use(chaiHttp)

describe('Portfolio Backend', () => {

  // TEST: GET
  describe('Handle GET requests', () => {
    describe('GET /', () => {
      it('should get README.html', (done) => {
        chai.request(app).
          get('/').
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.html
            done()
          })
      })
    })

    describe('GET /projects', () => {
      it('should get all projects')
    })
    describe('GET /project/:id', () => {
      const ids = [1, 2, 3, 4]
      for (const id in ids) {
        if (Object.hasOwnProperty.call(ids, id)) {
          const project = ids[id];
          it(`should get project ${project}`)
        }
      }
    })
    describe('GET /project/:title', () => {
      const titles = ['First', 'blah', 'a', 'Can you hear me?']
      let projectId = 1
      for (const id in titles) {
        if (Object.hasOwnProperty.call(titles, id)) {
          const project = titles[id];
          it(`should get project "${project}" of id ${projectId}`)
          projectId += 1
        }
      }
    })
    // describe('GET /projects/category/:category')
    // describe('GET /projects/recent/:amount')
    // describe('GET /projects/oldest/:amount')
    // describe('GET /projects/:category/recent/:amount')
    // describe('GET /projects/:category/recent/:amount')

    // describe('GET /blobs')
    // describe('GET /blob/:id')
    // describe('GET /blob/:filename')
    // describe('GET /blob/type/:filetype')
    // describe('GET /project/:projectid/blobs')
    // describe('GET /project/:projectid/thumbnail')
  })

  // TEST: POST
  describe('Handle POST requests', () => {
    describe('POST /create/project', () => {
      it('should create new project')
    })
  })

  // TEST: GET AGAIN
  describe('GET newly created information', () => {
    describe('GET /', () => {
      it('should get README.html')
    })
  })

  // TEST: DELETE
  describe('Handle DELETE requests', () => {
    describe('DELETE /delete/project/:id', () => {
      it('should delete newly created projects')
    })
  })
})
