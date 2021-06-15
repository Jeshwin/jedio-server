/* eslint-disable init-declarations */
const multiparty = require('multiparty')
const fse = require('fs-extra')
const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  // FIXME
  createProject: (req, res, next) => {
    const form = new multiparty.Form()
    let thumbnail
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
      }).catch((err) => console.error(err))

      // Upload thumbnail to portfolio.blobs table
      Blob.create({
        filename: thumbnail.filename,
        filetype: thumbnail.filetype,
        createdAt,
        updatedAt
      }).catch((err) => console.error(err))

      res.send(`Created ${category} project ${title}<br>
        Description: ${description}<br>
        Created At: ${createdAt}<br>
        Updated At: ${updatedAt}<br>
        Thumbnail Data: ${JSON.stringify(thumbnail)}`)
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
        thumbnail = {}
        thumbnail.filename = part.filename.slice(0, part.filename.lastIndexOf('.'))
        thumbnail.filetype = part.filename.slice(part.filename.lastIndexOf('.') + 1, part.filename.length)
        part.on('data', (buf) => {
          const fileDir = `public/${thumbnail.filetype}`
          const fileLocation = `${fileDir}/${thumbnail.filename}.${thumbnail.filetype}`

          fse.ensureDirSync(fileDir)
          fse.ensureFileSync(fileLocation)
          fse.outputFileSync(fileLocation, buf)
        })
      }
    })

    // Parse the form
    form.parse(req)
  }
}