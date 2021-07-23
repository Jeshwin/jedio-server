/* eslint-disable capitalized-comments */
/* eslint-disable init-declarations */
const multiparty = require('multiparty')
const fse = require('fs-extra')
const seedrandom = require('seedrandom')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects
const User = models.users

module.exports = {
  createProject: (req, res, next) => {
    const form = new multiparty.Form()
    let fileName
    let fileType
    let userId
    let title
    let category
    let description
    const createdAt = new Date().toString()
    const updatedAt = new Date().toString()

    form.on('error', next)
    form.on('close', () => {
      // Upload project to portfolio.projects table
      Project.create({
        title,
        category,
        description,
        userId,
        createdAt,
        updatedAt
      }).then((project) => {
        console.log(project.dataValues)
        // Then, upload thumbnail to portfolio.blobs table with projectId
        Blob.create({
          fileName,
          fileType,
          projectId: project.dataValues.id,
          createdAt,
          updatedAt
        }).catch((err) => console.error(err))
      }).
      catch((err) => console.error(err))

      res.json({
        title,
        category,
        description,
        userId,
        thumbnail: {
          fileName,
          fileType
        },
        createdAt,
        updatedAt
      })
    })

    // Get information from other fields
    form.on('field', (name, val) => {
      switch (name) {
        case 'title':
          title = val
          break
        case 'category':
          category = val
          break
        case 'description':
          description = val
          break
        case 'userId':
          userId = parseInt(val, 10)
          break
        default:
          break
      }
    })

    // Get information from thumbnail field and create file in public folder
    form.on('part', (part) => {
      if (part.filename) {
        fileName = part.filename.slice(0, part.filename.lastIndexOf('.'))
        fileType = part.filename.slice(part.filename.lastIndexOf('.') + 1, part.filename.length)
        part.on('data', (buf) => {
          const fileDir = `public/${fileType}`
          const fileLocation = `${fileDir}/${fileName}.${fileType}`

          fse.ensureDirSync(fileDir)
          fse.ensureFileSync(fileLocation)
          console.log('File is ensured           ✅')
          fse.appendFileSync(fileLocation, buf)
          console.log('Data written to file      ✅')
        })
      }
    })

    // Parse the form
    form.parse(req)
  },
  createBlob: (req, res, next) => {
    const form = new multiparty.Form()
    let fileName
    let fileType
    let projectTitle
    const createdAt = new Date().toString()
    const updatedAt = new Date().toString()

    form.on('error', next)
    form.on('close', () => {
      // Find selected project
      Project.findAll({
        where: {
          title: projectTitle
        },
        attributes: ['id']
      }).then((project) => {
        console.log(projectTitle)
        console.log(project[0].dataValues)
        // Then, upload blob to portfolio.blobs table with projectId
        Blob.create({
          fileName,
          fileType,
          projectId: project[0].dataValues.id,
          createdAt,
          updatedAt
        }).catch((err) => console.error(err))
      }).
      catch((err) => console.error(err))

      res.json({
        fileName,
        fileType,
        projectTitle,
        createdAt,
        updatedAt
      })
    })

    // Get projectTitle from project select field
    form.on('field', (name, val) => {
      // eslint-disable-next-line curly
      if (name !== 'project') return
      projectTitle = val
    })

    // Get information from blob field and create file in public folder
    form.on('part', (part) => {
      if (part.filename) {
        fileName = part.filename.slice(0, part.filename.lastIndexOf('.'))
        fileType = part.filename.slice(part.filename.lastIndexOf('.') + 1, part.filename.length)
        part.on('data', (buf) => {
          const fileDir = `public/${fileType}`
          const fileLocation = `${fileDir}/${fileName}.${fileType}`

          fse.ensureDirSync(fileDir)
          fse.ensureFileSync(fileLocation)
          console.log('File is ensured           ✅')
          fse.appendFileSync(fileLocation, buf)
          console.log('Data written to file      ✅')
        })
      }
    })

    // Parse the form
    form.parse(req)
  },
  updateProject: (req, res) => {
    console.log(req.body)
    res.json(req.body)
    if (req.body.description !== '') {
      Project.update({ description: req.body.description }, {
        where: {
          title: req.body.oldtitle
        }
      })
    }
    if (req.body.category !== '') {
      Project.update({ category: req.body.category }, {
        where: {
          title: req.body.oldtitle
        }
      })
    }
    if (req.body.title !== '') {
      Project.update({ title: req.body.title }, {
        where: {
          title: req.body.oldtitle
        }
      })
    }
  },
  registerUser: (req, res) => {
    console.log(req.body)
    const arng = seedrandom.alea(`@${req.body.username}+${req.body.email}`)
    let avatar = ''
    avatar += Math.floor(arng() * 16).toString(16)
    avatar += Math.floor(arng() * 16).toString(16)
    avatar += Math.floor(arng() * 16).toString(16)
    avatar += Math.floor(arng() * 16).toString(16)
    console.log(`Avatar: #${avatar}`)
    User.create({
      username: req.body.username,
      email: req.body.email,
      avatar,
      isAdmin: req.body.isAdmin,
      password: req.body.password
    }).then(() => {
      res.json(req.body)
    }).
    catch((err) => {
      console.error(err)
      res.json(err)
    })
  },
  loginUser: (req, res) => {
    console.log(req.body)
    User.findAll({
      where: {
        username: req.body.username,
      },
      limit: 1
    }).then((responseData) => {
      const user = responseData[0].dataValues
      console.log(user)
      if (responseData[0].correctPassword(req.body.password)) {
        const token = jwt.sign(user, process.env.TOKEN_SECRET)
        const response = {}
        response.id = user.id
        response.username = user.username
        response.email = user.email
        response.avatar = user.avatar
        response.isAdmin = user.isAdmin
        response.createdAt = user.createdAt
        response.updatedAt = user.updatedAt
        response.accessToken = token
        res.json(response)
      } else {
        res.status(403).send({ message: 'Password is incorrect' })
      }
    }).
    catch((err) => {
      console.error(err)
      res.status(401).send({ message: `Could not find user ${req.body.username}` })
    })
  }
}