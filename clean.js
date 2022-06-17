const models = require("./sql/model/models.js");

models.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables synced 👍");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
