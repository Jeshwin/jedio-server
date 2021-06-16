const models = require('../sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

module.exports = {
  getProjects: (req, res) => {
    console.log('Getting all projects...')
    Project.findAll().then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find projects' })
    })
  },
  getProjectById: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
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
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find this category' })
    })
  },
  // Return recently updated projects up to a certain number
  getRecentProjects: (req, res) => {
    console.log(req.params)
    Project.findAll({
      limit: parseInt(req.params.amount, 10),
      order: [['updatedAt', 'DESC']]
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find projects' })
    })
  },
  // Return oldest projects up to a certain number
  getOldestProjects: (req, res) => {
    console.log(req.params)
    Project.findAll({
      limit: parseInt(req.params.amount, 10),
      order: [['createdAt', 'ASC']]
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find projects' })
    })
  },
  // Return recently updated projects in a category up to a certain number
  getRecentProjectsByCategory: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        category: req.params.category
      },
      limit: parseInt(req.params.amount, 10),
      order: [['updatedAt', 'DESC']]
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find projects' })
    })
  },
  // Return oldest projects in a category up to a certain number
  getOldestProjectsByCategory: (req, res) => {
    console.log(req.params)
    Project.findAll({
      where: {
        category: req.params.category
      },
      limit: parseInt(req.params.amount, 10),
      order: [['createdAt', 'ASC']]
    }).then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find projects' })
    })
  },
  getBlobs: (req, res) => {
    console.log('Getting all blobs...')
    Blob.findAll().then((responseData) => {
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find blobs' })
    })
  },
  getBlobById: (req, res) => {
    console.log(req.params)
    Blob.findAll({
      where: {
        id: req.params.id
      }
    }).then((responseData) => {
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
      res.json(responseData)
    }).
    catch((err) => {
      console.error(err)
      res.json({ 'error': 'Could not find file by id' })
    })
  }
}