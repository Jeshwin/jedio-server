const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const models = {}

models.Sequelize = Sequelize
models.sequelize = sequelize

models.blobs = require('./blob.model.js')(sequelize, Sequelize)
models.projects = require('./project.model.js')(sequelize, Sequelize)

module.exports = models
