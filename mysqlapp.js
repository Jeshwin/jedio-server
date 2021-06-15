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
    fileType: 'stl',
    fileBin: binData,
    isThumbnail: false
  }).then((blob) => {

    // Create local public directory and file
    const fileDir = `public/${blob.fileType}`
    const fileLocation = `${fileDir}/${blob.fileName}.${blob.fileType}`

    fse.ensureDirSync(fileDir)
    fse.ensureFileSync(fileLocation)
    console.log('Directory and file ensured ✅')

    // Ensure that fileBin is a Buffer object
    if (blob.fileBin instanceof Buffer) {
      console.log('fileBin is a Buffer object ✅')

      // Write data from fileBin into ensured file
      fse.outputFileSync(fileLocation, blob.fileBin)
      process.exit(0)
    } else {
      console.log('fileBin is not of type Buffer 🟥')
      process.exit(1)
    }
  })
})
