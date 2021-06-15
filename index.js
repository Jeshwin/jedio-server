const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const getMiddleware = require('./middleware/get.middleware.js')

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw({ limit: '16mb' }))

// Returns file data from public folder
app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('<h1>Hello World</h1>')
})

// Returns info about project from integer id
app.get('/project/:id(\\d+)/', (req, res) => {
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

// Returns file data by integer id
app.get('/blob/:id(\\d+)', (req, res) => {
  getMiddleware.getBlobById(req, res)
})

// Returns file data by file name
app.get('/blob/:filename', (req, res) => {
  getMiddleware.getBlobByName(req, res)
})

// Returns file data for all blobs of a certain file type
app.get('/blob/type/:filetype', (req, res) => {
  getMiddleware.getBlobsByType(req, res)
})

// TODO: Return all projects for certain project by id
// TODO: Return file data for project thumbnail
// TODO: Return most recent blobs up to a certain number
// TODO: Return recently updated projects up to a certain number
// TODO: Return oldest projects up to a certain number
// TODO: Return recently updated projects in a category up to a certain number
// TODO: Return oldest projects in a category up to a certain number

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`)
})