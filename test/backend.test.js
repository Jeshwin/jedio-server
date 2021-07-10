/* eslint-disable no-undef */
/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-expressions */
// const { expect } = require('chai')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../index')

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
      it('should get all projects', (done) => {
        chai.request(app).
          get('/projects').
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(4)
            for (const id in res.body) {
              if (Object.hasOwnProperty.call(res.body, id)) {
                expect(res.body[id]).to.be.a('Object')
                expect(res.body[id].id).to.equal(parseInt(id, 10) + 1)
                expect(res.body[id].category).to.equal('test')
              }
            }
            done()
          })
      })
    })

    describe('GET /project/:id', () => {
      const ids = [1, 2, 3, 4]
      for (const id in ids) {
        if (Object.hasOwnProperty.call(ids, id)) {
          const project = ids[id];
          it(`should get project ${project}`, (done) => {
            chai.request(app).
              get(`/project/${project}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(1)
                expect(res.body[0].id).to.equal(project)
                done()
              })
          })
        }
      }
    })

    describe('GET /project/:title', () => {
      const titles = ['First', 'blah', 'a', 'Can you hear me?']
      for (const id in titles) {
        if (Object.hasOwnProperty.call(titles, id)) {
          const title = titles[id];
          it(`should get project "${title}"`, (done) => {
            chai.request(app).
              get(`/project/${encodeURIComponent(title)}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(1)
                expect(res.body[0].title).to.equal(title)
                done()
              })
          })
        }
      }
    })

    describe('GET /projects/category/:category', () => {
      it('should get projects in the test category', (done) => {
        chai.request(app).
          get('/project/category/test').
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            done()
          })
      })
    })

    describe('GET /project/recent/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id]
          it(`should get ${amount} most recent project(s)`, (done) => {
            chai.request(app).
              get(`/project/recent/${amount}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(amount)
                done()
              })
          })
        }
      }
    })

    describe('GET /projects/oldest/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          it(`should get ${amount} oldest project(s)`, (done) => {
            chai.request(app).
              get(`/project/oldest/${amount}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(amount)
                done()
              })
          })
        }
      }
    })

    describe('GET /projects/:category/recent/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          it(`should get ${amount} most recent project(s) in test category`, (done) => {
            chai.request(app).
              get(`/project/test/recent/${amount}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(amount)
                done()
              })
          })
        }
      }
    })

    describe('GET /projects/:category/oldest/:amount', () => {
      const amounts = [1, 2, 3, 4]
      for (const id in amounts) {
        if (Object.hasOwnProperty.call(amounts, id)) {
          const amount = amounts[id];
          it(`should get ${amount} oldest project(s) in test category`, (done) => {
            chai.request(app).
              get(`/project/test/oldest/${amount}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(amount)
                done()
              })
          })
        }
      }
    })

    describe('GET /blobs', () => {
      it('should get all blobs', (done) => {
        chai.request(app).
          get('/blobs').
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            done()
          })
      })
    })

    describe('GET /blob/:id', () => {
      const ids = [1, 2, 3, 4, 5, 6, 7]
      for (const id in ids) {
        if (Object.hasOwnProperty.call(ids, id)) {
          const blob = ids[id];
          it(`should get blob ${blob}`, (done) => {
            chai.request(app).
              get(`/blob/${blob}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body[0].id).to.equal(blob)
                done()
              })
          })
        }
      }
    })

    describe('GET /blob/:filename', () => {
      const filenames = ['placeholder', 'kitten', 'shield', 'blah', 'wata', 'python', 'three']
      for (const id in filenames) {
        if (Object.hasOwnProperty.call(filenames, id)) {
          const filename = filenames[id];
          it(`should get blob '${filename}'`, (done) => {
            chai.request(app).
              get(`/blob/${filename}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body[0].fileName).to.equal(filename)
                done()
              })
          })
        }
      }
    })

    describe('GET /blob/type/:filetype', () => {
      const filetypes = ['png', 'stl', 'wav']
      for (const id in filetypes) {
        if (Object.hasOwnProperty.call(filetypes, id)) {
          const filetype = filetypes[id];
          it(`should get all ${filetype} blobs`, (done) => {
            chai.request(app).
              get(`/blob/type/${filetype}`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                for (const jd in res.body) {
                  if (Object.hasOwnProperty.call(res.body, jd)) {
                    expect(res.body[jd].fileType).to.equal(filetype)
                  }
                }
                done()
              })
          })
        }
      }
    })

    describe('GET /project/:projectid/blobs', () => {
      const projectids = [1, 2, 3, 4]
      for (const id in projectids) {
        if (Object.hasOwnProperty.call(projectids, id)) {
          const projectid = projectids[id];
          it(`should get all blobs for project ${projectid}`, (done) => {
            chai.request(app).
              get(`/project/${projectid}/blobs`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                for (const jd in res.body) {
                  if (Object.hasOwnProperty.call(res.body, jd)) {
                    const blob = res.body[jd]
                    expect(blob.projectId).to.equal(projectid)
                    expect(blob.fileName).to.exist
                    expect(blob.fileType).to.exist
                  }
                }
                done()
              })
          })
        }
      }
    })

    describe('GET /project/:projectid/thumbnail', () => {
      const projectids = [1, 2, 3, 4]
      for (const id in projectids) {
        if (Object.hasOwnProperty.call(projectids, id)) {
          const projectid = projectids[id];
          it(`should get thumbnail for project ${projectid}`, (done) => {
            chai.request(app).
              get(`/project/${projectid}/thumbnail`).
              end((err, res) => {
                expect(err).to.equal(null)
                expect(res).to.be.a('Object')
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.lengthOf(1)
                const thumbnail = res.body[0]
                expect(thumbnail.projectId).to.equal(projectid)
                expect(thumbnail.fileName).to.exist
                expect(thumbnail.fileType).to.exist
                done()
              })
          })
        }
      }
    })
  })

  // TEST: POST
  describe('Handle POST requests', () => {
    describe('POST /create/project', () => {
      const titles = ['Mocha', 'Chai', 'Coffee', 'Melon', 'Chocolate', 'Candy']
      const categories = ['test', 'test', 'cee', 'water', 'cee', 'cee']
      const descriptions = [
        'This is a dummy project. FOR MOCHA!',
        'This is a dummy project. FOR CHAI!',
        'Did you know coffee starts with a \'c\'?',
        'My favorite melon is watermelon; canteloupe is good too. HONEYDEW THO...',
        'Chocolate also starts with a \'c\'!!!',
        'What can I say? Candy is candy!'
      ]
      for (const id in titles) {
        if (Object.hasOwnProperty.call(titles, id)) {
          const title = titles[id]
          const category = categories[id]
          const description = descriptions[id]
          it(`Title: ${title}, Category: ${category}, Desc.: ${description.slice(0, 5).trim()}...`)
        }
      }
    })
    describe('POST /create/blob', () => {
      it('Project: Chai, Blob: colors.png')
      it('Project: Coffee, Blob: Soikulls.stl')
      it('Project: Melon, Blob: keystep.png')
      it('Project: Chocolate, Blob: cooked meat.png')
      it('Project: Mocha, Blob: smaller bobbby.jpg')
      it('Project: blah, Blob: switch_lite.png')
      it('Project: blah, Blob: Useless Knob.stl')
    })
    describe('POST /update/project', () => {
      it('should update title')
      it('should update description')
      it('should update category')
      it('should update title and description')
      it('should update description and category')
      it('should update category and title')
      it('should update title, description, and category')
      it('should update nothing')
    })
  })

  // TEST: GET AGAIN
  describe('GET newly created information', () => {
    describe('GET /projects', () => {
      it('should get all projects')
      // TODO: get all ids and titles
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

  // TEST: DELETE
  describe('Handle DELETE requests', () => {
    describe('DELETE /delete/project/:id', () => {
      it('should delete newly created projects')
      // New its for each deletion
    })
    describe('DELETE /delete/blob/:id', () => {
      it('should delete remaining new blobs')
      // New its for each deletion
    })
    describe('DELETE /delete/category/:category', () => {
      it('should delete newly created categories')
      // New its for each deletion
    })
  })
})
