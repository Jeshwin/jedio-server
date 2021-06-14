const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw({ limit: '16mb' }))

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`)
})