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

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('<h1>Hello World</h1>')
})

app.get('/project/:id(\\d+)/', (req, res) => {
  getMiddleware.getProjectById(req, res)
})

app.get('/project/:title', (req, res) => {
  getMiddleware.getProjectByTitle(req, res)
})

app.get('/project/:id/blob/:num', (req, res) => {
  getMiddleware.getBlob(req, res)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`)
})