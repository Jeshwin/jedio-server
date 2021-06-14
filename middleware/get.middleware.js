const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  getProjectById: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find this project' })
    })
  },
  getProjectByTitle: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        title: req.params.title
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find this project' })
    })
  },
  getBlob: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        projectId: req.params.id,
        orderNum: req.params.num
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find this blob' })
    })
  }
}