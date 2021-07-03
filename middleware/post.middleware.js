/* eslint-disable capitalized-comments */
/* eslint-disable init-declarations */
const multiparty = require('multiparty')
const fse = require('fs-extra')
const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  createProject: (req, res, next) => {
    const form = new multiparty.Form()
    let fileName
    let fileType
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

      // TEST: send what information was received
      res.send(`Created ${category} project ${title}<br>
        Description: ${description}<br>
        Created At: ${createdAt}<br>
        Updated At: ${updatedAt}<br>
        Thumbnail Name: ${fileName}<br>
        Thumbnail Extensions: ${fileType}`)
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

      // TEST: send what information was received
      res.send(`Created blob ${fileName}.${fileType}<br>
        Project: ${projectTitle}<br>
        Created At: ${createdAt}<br>
        Updated At: ${updatedAt}<br>`)
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
  }
}