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
    let createdAt
    let updatedAt

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
        case 'dateCreated':
          createdAt = val
          updatedAt = val
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
  }
}