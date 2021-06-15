const fse = require('fs-extra')
const models = require('./sql/model/models.js')

const Blob = models.blobs

models.sequelize.sync({ force: true }).then(() => {
  // Get binary data from STL file
  const stlHome = `${process.env.HOME}/Desktop/3D Printing Files/STls/`
  const inputFileLocation = 'PowerWireClip.stl'
  const binData = fse.readFileSync(stlHome + inputFileLocation)

  // Create Blob table entry
  Blob.create({
    fileName: 'PowerWireClip',
    fileType: 'stl'
  }).then((blob) => {

    // Create local public directory and file
    const fileDir = `public/${blob.fileType}`
    const fileLocation = `${fileDir}/${blob.fileName}.${blob.fileType}`

    fse.ensureDirSync(fileDir)
    fse.ensureFileSync(fileLocation)
    console.log('Directory and file ensured ✅')

    fse.outputFileSync(fileLocation, binData)
    process.exit(0)
  })
})
