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
      res.json({ 'error': 'Could not find project by id' })
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
      res.json({ 'error': 'Could not find project by title' })
    })
  },
  getProjectsByCategory: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        category: req.params.category
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find this category' })
    })
  },
  getBlobById: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find file by id' })
    })
  },
  getBlobByName: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        fileName: req.params.filename
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find file by id' })
    })
  },
  getBlobsByType: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        fileType: req.params.filetype
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find file by id' })
    })
  },
  getBlobsByProjectId: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        projectId: req.params.projectid
      }
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find project by id' })
    })
  },
  getThumbnailBlob: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        projectId: req.params.projectid
      },
      limit: 1
    }).then((responseData) => {
      console.log(responseData[0].dataValues)
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find file by id' })
    })
  }
}