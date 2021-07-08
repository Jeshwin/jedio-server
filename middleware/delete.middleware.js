const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  deleteProject: (req, res) => {
    console.log(req.params)
    Blob.destroy({
      where: {
        projectId: req.params.id
      }
    }).then(() => {
      Project.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        res.json({ 'success': 'success!' })
      }).
      catch((err) => {
        console.error(err)
        res.json(err)
      })
    }).
    catch((err) => {
      console.error(err)
      res.json(err)
    })
  },
  deleteBlob: (req, res) => {
    console.log(req.params)
    Blob.destroy({
      where: {
        id: req.params.id
      },
      limit: 1
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json(err)
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
      res.json(err)
    })
  }
}