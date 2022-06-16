module.exports = {
  HOST: 'localhost',
  USER: 'jeshwinsql',
  PASSWORD: '7headboySQL',
  DB: 'portfolio',
  dialect: 'postgresql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
