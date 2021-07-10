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

    describe('GET /projects/category/:category', () => {
      it('should get projects in the test category')
    })

    describe('GET /projects/recent/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          if (amount === 1) {
            it('should get most recent project')
          } else {
            it(`should get ${amount} most recent projects`)
          }
        }
      }
    })

    describe('GET /projects/oldest/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          if (amount === 1) {
            it('should get oldest project')
          } else {
            it(`should get ${amount} oldest projects`)
          }
        }
      }
    })

    describe('GET /projects/:category/recent/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          if (amount === 1) {
            it('should get most recent project in test category')
          } else {
            it(`should get ${amount} most recent projects in test category`)
          }
        }
      }
    })

    describe('GET /projects/:category/oldest/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          if (amount === 1) {
            it('should get oldest project in test category')
          } else {
            it(`should get ${amount} oldest projects in test category`)
          }
        }
      }
    })

    describe('GET /blobs', () => {
      it('should get all blobs')
    })

    describe('GET /blob/:id', () => {
      const ids = [1, 2, 3, 4, 5, 6, 7]
      for (const id in ids) {
        if (Object.hasOwnProperty.call(ids, id)) {
          const blob = ids[id];
          it(`should get blob ${blob}`)
        }
      }
    })

    describe('GET /blob/:filename', () => {
      const filenames = ['placeholder', 'kitten', 'shield', 'blah', 'wata', 'python', 'three']
      for (const id in filenames) {
        if (Object.hasOwnProperty.call(filenames, id)) {
          const filename = filenames[id];
          it(`should get blob '${filename}'`)
        }
      }
    })

    describe('GET /blob/type/:filetype', () => {
      const filetypes = ['png', 'stl', 'wav']
      for (const id in filetypes) {
        if (Object.hasOwnProperty.call(filetypes, id)) {
          const filetype = filetypes[id];
          it(`should get all ${filetype} blobs`)
        }
      }
    })

    describe('GET /project/:projectid/blobs', () => {
      const projectids = [1, 2, 3, 4]
      for (const id in projectids) {
        if (Object.hasOwnProperty.call(projectids, id)) {
          const projectid = projectids[id];
          it(`should get all blobs for project ${projectid}`)
        }
      }
    })

    describe('GET /project/:projectid/thumbnail', () => {
      const projectids = [1, 2, 3, 4]
      for (const id in projectids) {
        if (Object.hasOwnProperty.call(projectids, id)) {
          const projectid = projectids[id];
          it(`should get thumbnail for project ${projectid}`)
        }
      }
    })
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
