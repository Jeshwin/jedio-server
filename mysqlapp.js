/* eslint-disable capitalized-comments */
// const fse = require('fs-extra')
const models = require('./sql/model/models.js')

const Blob = models.blobs
const Project = models.projects

models.sequelize.sync({ force: true }).then(() => {
  const testProjects = [
    {
      id: 1,
      title: 'First',
      category: 'test',
      description: 'This is the first test entry',
      createdAt: '2085-07-07 04:03:52',
      updatedAt: '2000-09-25 22:50:06'
    },
    {
      id: 2,
      title: 'a',
      category: 'test',
      description: 'bcd',
      createdAt: '2005-06-15 03:03:14',
      updatedAt: '2066-11-26 03:00:35'
    },
    {
      id: 3,
      title: 'blah',
      category: 'test',
      description: 'blah blah blah',
      createdAt: '2019-06-05 09:03:20',
      updatedAt: '2036-03-14 07:57:13'
    },
    {
      id: 4,
      title: 'Can you hear me?',
      category: 'test',
      description: 'MARCO!!!!!',
      createdAt: '2010-04-21 19:13:34',
      updatedAt: '2034-09-25 15:40:55'
    }
  ]
  const testBlobs = [
    {
      id: 1,
      fileName: 'placeholder',
      fileType: 'png',
      projectId: 3,
      createdAt: '2085-06-02 03:47:04',
      updatedAt: '2030-07-27 12:21:28'
    },
    {
      id: 2,
      fileName: 'kitten',
      fileType: 'png',
      projectId: 2,
      createdAt: '2042-04-02 03:11:07',
      updatedAt: '2057-04-28 03:30:58'
    },
    {
      id: 3,
      fileName: 'shield',
      fileType: 'wav',
      projectId: 2,
      createdAt: '1994-04-12 06:12:08',
      updatedAt: '2025-06-06 16:52:05'
    },
    {
      id: 4,
      fileName: 'blah',
      fileType: 'stl',
      projectId: 3,
      createdAt: '1995-02-04 05:44:34',
      updatedAt: '2007-05-27 21:30:23'
    },
    {
      id: 5,
      fileName: 'wata',
      fileType: 'wav',
      projectId: 2,
      createdAt: '2061-08-21 23:27:26',
      updatedAt: '2027-05-25 23:45:39'
    },
    {
      id: 6,
      fileName: 'python',
      fileType: 'png',
      projectId: 4,
      createdAt: '2016-12-03 02:05:50',
      updatedAt: '2026-08-23 12:22:49'
    },
    {
      id: 7,
      fileName: 'three',
      fileType: 'stl',
      projectId: 1,
      createdAt: '2010-11-03 17:07:16',
      updatedAt: '2087-06-08 19:35:24'
    }
  ]
  testProjects.forEach((project) => {
    Project.create(project).then((projectInfo) => console.log(projectInfo.dataValues))
  })
  testBlobs.forEach((blob) => {
    Blob.create(blob).then((blobInfo) => console.log(blobInfo.dataValues))
  })
})