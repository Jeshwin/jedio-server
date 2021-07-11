/* eslint-disable no-undef */
/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-expressions */
// const { expect } = require('chai')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../index')
const fse = require('fs-extra')
const axios = require('axios')

  // GET
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
          res.body.forEach((project) => {
            expect(project).to.be.a('Object')
            expect(project.category).to.equal('test')
            expect(project.title).to.exist
            expect(project.description).to.exist
          })
          done()
        })
    })
  })

  describe('GET /project/:id', () => {
    const ids = [1, 2, 3, 4]
    ids.forEach((id) => {
      it(`should get project ${id}`, (done) => {
        chai.request(app).
          get(`/project/${id}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].id).to.equal(id)
            done()
          })
      })
    })
  })

  describe('GET /project/:title', () => {
    const titles = ['First', 'blah', 'a', 'Can you hear me?']
    titles.forEach((title) => {
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
    })
  })

  describe('GET /projects/category/:category', () => {
    it('should get projects in the test category', (done) => {
      chai.request(app).
        get('/projects').
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.be.a('Object')
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.have.lengthOf(4)
          res.body.forEach((project) => {
            expect(project).to.be.a('Object')
            expect(project.category).to.equal('test')
          })
          done()
        })
    })
  })

  describe('GET /project/recent/:amount', () => {
    const amounts = [1, 2, 3, 4]
    amounts.forEach((amount) => {
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
    })
  })

  describe('GET /projects/oldest/:amount', () => {
    const amounts = [1, 2, 3, 4]
    amounts.forEach((amount) => {
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
    })
  })

  describe('GET /projects/:category/recent/:amount', () => {
    const amounts = [1, 2, 3, 4]
    amounts.forEach((amount) => {
      it(`should get ${amount} most recent project(s) in test category`, (done) => {
        chai.request(app).
          get(`/project/test/recent/${amount}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(amount)
            res.body.forEach((project) => {
              expect(project).to.be.a('Object')
              expect(project.category).to.equal('test')
            })
            done()
          })
      })
    })
  })

  describe('GET /projects/:category/oldest/:amount', () => {
    const amounts = [1, 2, 3, 4]
    amounts.forEach((amount) => {
      it(`should get ${amount} most recent project(s) in test category`, (done) => {
        chai.request(app).
          get(`/project/test/recent/${amount}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(amount)
            res.body.forEach((project) => {
              expect(project).to.be.a('Object')
              expect(project.category).to.equal('test')
            })
            done()
          })
      })
    })
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
          expect(res.body).to.have.lengthOf(7)
          res.body.forEach((blob) => {
            expect(blob).to.be.a('Object')
            expect(blob.fileName).to.exist
            expect(blob.fileType).to.exist
          })
          done()
        })
    })
  })

  describe('GET /blob/:id', () => {
    const ids = [1, 2, 3, 4, 5, 6, 7]
    ids.forEach((id) => {
      it(`should get blob ${id}`, (done) => {
        chai.request(app).
          get(`/blob/${id}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].id).to.equal(id)
            done()
          })
      })
    })
  })

  describe('GET /blob/:filename', () => {
    const filenames = ['placeholder', 'kitten', 'shield', 'blah', 'wata', 'python', 'three']
    filenames.forEach((filename) => {
      it(`should get blob '${filename}'`, (done) => {
        chai.request(app).
          get(`/blob/${filename}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].fileName).to.equal(filename)
            done()
          })
      })
    })
  })

  describe('GET /blob/type/:filetype', () => {
    const filetypes = ['png', 'stl', 'wav']
    filetypes.forEach((filetype) => {
      it(`should get all .${filetype} blobs`, (done) => {
        chai.request(app).
          get(`/blob/type/${filetype}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            res.body.forEach((blob) => {
              expect(blob.fileType).to.equal(filetype)
            })
            done()
          })
      })
    })
  })

  describe('GET /project/:projectid/blobs', () => {
    const projectids = [1, 2, 3, 4]
    projectids.forEach((projectid) => {
      it(`should get all blobs for project ${projectid}`, (done) => {
        chai.request(app).
          get(`/project/${projectid}/blobs`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            res.body.forEach((blob) => {
              expect(blob.projectId).to.equal(projectid)
              expect(blob.fileName).to.exist
              expect(blob.fileType).to.exist
            })
            done()
          })
      })
    })
  })

  describe('GET /project/:projectid/thumbnail', () => {
    const projectids = [1, 2, 3, 4]
    projectids.forEach((projectid) => {
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
    })
  })
})

// POST
describe('Handle POST requests', () => {
  describe('POST /create/project', () => {
    const titles = ['Mocha', 'Chai', 'Coffee', 'Melon', 'Chocolate', 'Candy']
    const categories = ['test', 'test', 'cee', 'water', 'cee', 'cee']
    const descriptions = [
      'This is a dummy project. FOR MOCHA!',
      'This is a dummy project. FOR CHAI!',
      'Did you know coffee starts with a \'c\'?',
      'My favorite melon is watermelon canteloupe is good too. HONEYDEW THO...',
      'Chocolate also starts with a \'c\'!!!',
      'What can I say? Candy is candy!'
    ]
    const thumbnails = [
      'alex.png',
      'bobbby.jpeg',
      'gba_purple.jpg',
      'holiday puppy party.png',
      'red is sus.jpg',
      'thanos.png'
    ]
    titles.forEach((title, index) => {
      const category = categories[index]
      const description = descriptions[index]
      const thumbnail = thumbnails[index]
      it(`Title: ${title}, Category: ${category}, Blob: ${thumbnail}`, (done) => {
        chai.request(app).
          post('/create/project').
          set('Content-Type', 'multipart/form-data').
          field('title', title).
          field('category', category).
          field('description', description).
          attach('thumbnail', fse.readFileSync(`${__dirname}/images/${thumbnail}`), thumbnail).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body.title).to.equal(title)
            expect(res.body.category).to.equal(category)
            expect(res.body.description).to.equal(description)
            const returnedFileName = `${res.body.thumbnail.fileName}.${res.body.thumbnail.fileType}`
            expect(returnedFileName).to.equal(thumbnail)
            done()
          })
      })
    })
  })
  describe('POST /create/blob', () => {
    const projects = ['Chai', 'Coffee', 'Melon', 'Chocolate', 'Mocha', 'blah', 'blah']
    const blobs = [
      'colors.png',
      'Soikulls.stl',
      'keystep.png',
      'cooked meat.png',
      'smaller bobbby.jpg',
      'switch_lite.jpg',
      'Useless Knob.stl'
    ]
    projects.forEach((project, index) => {
      const blob = blobs[index]
      it(`Project: ${project}, Blob: ${blob}`, (done) => {
        chai.request(app).
        post('/create/blob').
        set('Content-Type', 'multipart/form-data').
        attach('blob', fse.readFileSync(`${__dirname}/images/${blob}`), blob).
        field('project', project).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.projectTitle).to.equal(project)
          const returnedFileName = `${res.body.fileName}.${res.body.fileType}`
          expect(returnedFileName).to.equal(blob)
          done()
        })
      })
    })
  })
  describe('POST /update/project', () => {
    const newInfo = {
      title: 'Latte',
      category: 'updated',
      description: 'Updated Description'
    }
    it('should update title', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': newInfo.title,
          'category': '',
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal(newInfo.title)
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should revert title', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': newInfo.title,
          'title': 'Mocha',
          'category': '',
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal(newInfo.title)
          expect(res.body.title).to.equal('Mocha')
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should update description', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': '',
          'description': newInfo.description
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.description).to.equal(newInfo.description)
          expect(res.body.category).to.equal('')
          done()
        })
    })
    it('should revert description', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': '',
          'description': 'This is a dummy project. FOR MOCHA!'
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal('This is a dummy project. FOR MOCHA!')
          done()
        })
    })
    it('should update category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': newInfo.category,
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal(newInfo.category)
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should revert category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': 'test',
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal('test')
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should update title and description', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': newInfo.title,
          'category': '',
          'description': newInfo.description
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal(newInfo.title)
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal(newInfo.description)
          done()
        })
    })
    it('should revert title and description', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': newInfo.title,
          'title': 'Mocha',
          'category': '',
          'description': 'This is a dummy project. FOR MOCHA!'
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal(newInfo.title)
          expect(res.body.title).to.equal('Mocha')
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal('This is a dummy project. FOR MOCHA!')
          done()
        })
    })
    it('should update description and category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': newInfo.category,
          'description': newInfo.description
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal(newInfo.category)
          expect(res.body.description).to.equal(newInfo.description)
          done()
        })
    })
    it('should revert description and category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': 'test',
          'description': 'This is a dummy project. FOR MOCHA!'
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal('test')
          expect(res.body.description).to.equal('This is a dummy project. FOR MOCHA!')
          done()
        })
    })
    it('should update category and title', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': newInfo.title,
          'category': newInfo.category,
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal(newInfo.title)
          expect(res.body.category).to.equal(newInfo.category)
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should revert category and title', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': newInfo.title,
          'title': 'Mocha',
          'category': 'test',
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal(newInfo.title)
          expect(res.body.title).to.equal('Mocha')
          expect(res.body.category).to.equal('test')
          expect(res.body.description).to.equal('')
          done()
        })
    })
    it('should update title, description, and category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': newInfo.title,
          'category': newInfo.category,
          'description': newInfo.description
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal(newInfo.title)
          expect(res.body.category).to.equal(newInfo.category)
          expect(res.body.description).to.equal(newInfo.description)
          done()
        })
    })
    it('should revert title, description, and category', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': newInfo.title,
          'title': 'Mocha',
          'category': 'test',
          'description': 'This is a dummy project. FOR MOCHA!'
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal(newInfo.title)
          expect(res.body.title).to.equal('Mocha')
          expect(res.body.category).to.equal('test')
          expect(res.body.description).to.equal('This is a dummy project. FOR MOCHA!')
          done()
        })
    })
    it('should update nothing', (done) => {
      chai.request(app).
        post('/update/project').
        send({
          'oldtitle': 'Mocha',
          'title': '',
          'category': '',
          'description': ''
        }).
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.oldtitle).to.equal('Mocha')
          expect(res.body.title).to.equal('')
          expect(res.body.category).to.equal('')
          expect(res.body.description).to.equal('')
          done()
        })
    })
  })
})

// GET AGAIN
describe('GET newly created information', () => {
  const projectList = [
    {
      id: 1,
      title: 'First',
      category: 'test'
    },
    {
      id: 2,
      title: 'blah',
      category: 'test'
    },
    {
      id: 3,
      title: 'a',
      category: 'test'
    },
    {
      id: 4,
      title: 'Can you hear me?',
      category: 'test'
    },
    {
      id: 5,
      title: 'Mocha',
      category: 'test'
    },
    {
      id: 6,
      title: 'Chai',
      category: 'test'
    },
    {
      id: 7,
      title: 'Coffee',
      category: 'cee'
    },
    {
      id: 8,
      title: 'Melon',
      category: 'water'
    },
    {
      id: 9,
      title: 'Chocolate',
      category: 'cee'
    },
    {
      id: 10,
      title: 'Candy',
      category: 'cee'
    }
  ]
  const blobList = [
    {
      id: 1,
      fileName: 'placeholder',
      fileType: 'png',
      projectId: 3
    },
    {
      id: 2,
      fileName: 'kitten',
      fileType: 'png',
      projectId: 2
    },
    {
      id: 3,
      fileName: 'shield',
      fileType: 'wav',
      projectId: 2
    },
    {
      id: 4,
      fileName: 'blah',
      fileType: 'stl',
      projectId: 3
    },
    {
      id: 5,
      fileName: 'wata',
      fileType: 'wav',
      projectId: 2
    },
    {
      id: 6,
      fileName: 'python',
      fileType: 'png',
      projectId: 4
    },
    {
      id: 7,
      fileName: 'three',
      fileType: 'stl',
      projectId: 1
    },
    {
      id: 8,
      fileName: 'alex',
      fileType: 'png',
      projectId: 5
    },
    {
      id: 9,
      fileName: 'bobbby',
      fileType: 'jpeg',
      projectId: 6
    },
    {
      id: 10,
      fileName: 'gba_purple',
      fileType: 'jpg',
      projectId: 7
    },
    {
      id: 11,
      fileName: 'holiday puppy party',
      fileType: 'png',
      projectId: 8
    },
    {
      id: 12,
      fileName: 'red is sus',
      fileType: 'jpg',
      projectId: 9
    },
    {
      id: 13,
      fileName: 'thanos',
      fileType: 'png',
      projectId: 10
    },
    {
      id: 14,
      fileName: 'colors',
      fileType: 'png',
      projectId: 6
    },
    {
      id: 15,
      fileName: 'Soikulls',
      fileType: 'stl',
      projectId: 7
    },
    {
      id: 16,
      fileName: 'keystep',
      fileType: 'png',
      projectId: 8
    },
    {
      id: 17,
      fileName: 'cooked meat',
      fileType: 'png',
      projectId: 9
    },
    {
      id: 18,
      fileName: 'smaller bobbby',
      fileType: 'jpg',
      projectId: 5
    },
    {
      id: 19,
      fileName: 'switch_lite',
      fileType: 'jpg',
      projectId: 2
    },
    {
      id: 20,
      fileName: 'Useless Knob',
      fileType: 'stl',
      projectId: 2
    }
  ]
  describe('GET /projects', () => {
    it('should get all projects', (done) => {
      chai.request(app).
        get('/projects').
        end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.be.a('Object')
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.have.lengthOf(10)
          res.body.forEach((project) => {
            expect(project).to.be.a('Object')
            expect(project.category).to.exist
            expect(project.title).to.exist
            expect(project.description).to.exist
          })
          done()
        })
    })
  })

  describe('GET /project/:id', () => {
    projectList.forEach((project) => {
      let projectId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/project/${encodeURIComponent(project.title)}`).catch((err) => console.error(err))
        projectId = res.data[0].id
      })

      it(`should get project ${projectId}`, (done) => {
        chai.request(app).
          get(`/project/${projectId}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].id).to.equal(projectId)
            done()
          })
      })
    })
  })

  describe('GET /project/:title', () => {
    projectList.forEach((project) => {
      it(`should get project "${project.title}"`, (done) => {
        chai.request(app).
          get(`/project/${encodeURIComponent(project.title)}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].title).to.equal(project.title)
            done()
          })
      })
    })
  })

  describe('GET /projects/category/:category', () => {
    const categories = []
    projectList.forEach((project) => {
      if (!categories.includes(project.category)) {
        categories.push(project.category)
      }
    })
    categories.forEach((category) => {
      it(`should get projects in the ${category} category`, (done) => {
        chai.request(app).
          get(`/project/category/${category}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            res.body.forEach((project) => {
              expect(project.category).to.equal(category)
            })
            done()
          })
      })
    })
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
          expect(res.body).to.have.lengthOf(20)
          res.body.forEach((blob) => {
            expect(blob).to.be.a('Object')
            expect(blob.fileName).to.exist
            expect(blob.fileType).to.exist
          })
          done()
        })
    })
  })

  describe('GET /blob/:id', () => {
    blobList.forEach((blob) => {
      let blobId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/blob/${encodeURIComponent(blob.fileName)}`).catch((err) => console.error(err))
        blobId = res.data[0].id
      })

      it(`should get blob ${blobId}`, (done) => {
        chai.request(app).
          get(`/blob/${blobId}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].id).to.equal(blobId)
            expect(res.body[0].fileName).to.equal(blob.fileName)
            done()
          })
      })
    })
  })

  describe('GET /blob/:filename', () => {
    blobList.forEach((blob) => {
      let blobId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/blob/${encodeURIComponent(blob.fileName)}`).catch((err) => console.error(err))
        blobId = res.data[0].id
      })

      it(`should get blob ${blob.fileName}`, (done) => {
        chai.request(app).
          get(`/blob/${encodeURIComponent(blob.fileName)}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].id).to.equal(blobId)
            expect(res.body[0].fileName).to.equal(blob.fileName)
            done()
          })
      })
    })
  })

  describe('GET /blob/type/:filetype', () => {
    const fileTypes = []
    blobList.forEach((blob) => {
      if (!fileTypes.includes(blob.fileType)) {
        fileTypes.push(blob.fileType)
      }
    })
    fileTypes.forEach((fileType) => {
      it(`should get all .${fileType} blobs`, (done) => {
        chai.request(app).
          get(`/blob/type/${fileType}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            res.body.forEach((blob) => {
              expect(blob.fileType).to.equal(fileType)
            })
            done()
          })
      })
    })
  })

  describe('GET /project/:projectid/blobs', () => {
    projectList.forEach((project) => {
      it(`should get all blobs for ${project.title}`, (done) => {
        chai.request(app).
          get(`/project/${project.id}/blobs`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            res.body.forEach((blob) => {
              expect(blob.projectId).to.equal(project.id)
            })
            done()
          })
      })
    })
  })

  describe('GET /project/:projectid/thumbnail', () => {
    projectList.forEach((project) => {
      let projectId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/project/${encodeURIComponent(project.title)}`).catch((err) => console.error(err))
        projectId = res.data[0].id
      })

      it(`should get thumbnail for ${project.title}`, (done) => {
        chai.request(app).
          get(`/project/${projectId}/thumbnail`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0].projectId).to.equal(projectId)
            done()
          })
      })
    })
  })
})

// DELETE
describe('Handle DELETE requests', () => {
  describe('DELETE /delete/project/:id', () => {
    const projects = ['Mocha', 'Chai']
    projects.forEach((project) => {
      let projectId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/project/${project}`).catch((err) => console.error(err))
        projectId = res.data[0].id
      })

      it(`should delete project ${project}`, (done) => {
        chai.request(app).
          delete(`/delete/project/${projectId}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body.success).to.exist
            done()
          })
      })
    })
  })
  describe('DELETE /delete/blob/:id', () => {
    const blobs = ['switch_lite', 'Useless Knob']
    blobs.forEach((blob) => {
      let blobId = 0

      before(async () => {
        const res = await axios.get(`http://localhost:3000/blob/${blob}`).catch((err) => console.error(err))
        blobId = res.data[0].id
      })

      it(`should delete blob ${blob}`, (done) => {
        chai.request(app).
          delete(`/delete/blob/${blobId}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body.success).to.exist
            done()
          })
      })
    })
  })
  describe('DELETE /delete/category/:category', () => {
    const categories = ['cee', 'water']
    categories.forEach((category) => {
      it(`should delete category ${category}`, (done) => {
        chai.request(app).
          delete(`/delete/category/${category}`).
          end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.be.a('Object')
            expect(res).to.have.status(200)
            expect(res).to.be.json
            done()
          })
      })
    })
  })
})
