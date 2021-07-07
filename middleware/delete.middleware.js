const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  deleteProject: (req, res) => {
    console.log(req.params)
    Project.destroy({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'could not find project by id' })
    })
  },
  deleteBlob: (req, res) => {
    console.log(req.params)
    Blob.destroy({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'could not find blob by id' })
    })
  },
  deleteCategory: (req, res) => {
    console.log(req.params)
    Project.destroy({
      where: {
        category: req.params.category
      }
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'could not find category' })
    })
  }
}