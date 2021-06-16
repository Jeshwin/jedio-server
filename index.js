const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const getMiddleware = require('./middleware/get.middleware.js')
const postMiddleware = require('./middleware/post.middleware.js')

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw({ limit: '16mb' }))

// Returns files from public folder
app.use(express.static('public'))

// Returns README of project as homepage
app.get('/', (req, res) => {
  res.sendFile('README.html', { root: __dirname })
})

// Returns info about all projects
app.get('/projects', (req, res) => {
  getMiddleware.getProjects(req, res)
})

// Returns info about project from integer id
app.get('/project/:id(\\d+)', (req, res) => {
  getMiddleware.getProjectById(req, res)
})

// Returns info about project from title
app.get('/project/:title', (req, res) => {
  getMiddleware.getProjectByTitle(req, res)
})

// Returns all projects in certain category
app.get('/project/category/:category', (req, res) => {
  getMiddleware.getProjectsByCategory(req, res)
})

// Return recently updated projects up to a certain number
app.get('/project/recent/:amount(\\d+)', (req, res) => {
  getMiddleware.getRecentProjects(req, res)
})

// Return oldest projects up to a certain number
app.get('/project/oldest/:amount(\\d+)', (req, res) => {
  getMiddleware.getOldestProjects(req, res)
})

// Return recently updated projects in a category up to a certain number
app.get('/project/:category/recent/:amount(\\d+)', (req, res) => {
  getMiddleware.getOldestProjects(req, res)
})

// Return oldest projects in a category up to a certain number
app.get('/project/:category/oldest/:amount(\\d+)', (req, res) => {
  getMiddleware.getOldestProjects(req, res)
})

// Return all blobs for certain project by id
app.get('/project/:projectid(\\d+)/blobs', (req, res) => {
  getMiddleware.getBlobsByProjectId(req, res)
})

// Return blob data for project thumbnail
app.get('/project/:projectid(\\d+)/thumbnail', (req, res) => {
  getMiddleware.getThumbnailBlob(req, res)
})

// Returns blob data by integer id
app.get('/blob/:id(\\d+)', (req, res) => {
  getMiddleware.getBlobById(req, res)
})

// Returns blob data by blob name
app.get('/blob/:filename', (req, res) => {
  getMiddleware.getBlobByName(req, res)
})

// Returns blob data for all blobs of a certain blob type
app.get('/blob/type/:filetype', (req, res) => {
  getMiddleware.getBlobsByType(req, res)
})

// Create new project with thumbnail from incoming data
app.post('/create/project', (req, res, next) => {
  console.log(req.headers)
  postMiddleware.createProject(req, res, next)
})

// Create new blob from incoming data
app.post('/create/blob', (req, res, next) => {
  console.log(req.headers)
  postMiddleware.createBlob(req, res, next)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`)
})