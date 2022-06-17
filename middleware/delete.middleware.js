const models = require("../sql/model/models.js");

const Blob = models.blobs;
const Project = models.projects;
const User = models.users;

module.exports = {
  deleteProject: (req, res) => {
    console.log(req.params);
    Blob.destroy({
      where: {
        projectId: req.params.id,
      },
    })
      .then(() => {
        Project.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => {
            res.json({ success: "success!" });
          })
          .catch((err) => {
            console.error(err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  },
  deleteBlob: (req, res) => {
    console.log(req.params);
    Blob.destroy({
      where: {
        id: req.params.id,
      },
      limit: 1,
    })
      .then(() => {
        res.json({ success: "success!" });
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  },
  deleteCategory: (req, res) => {
    console.log(req.params);
    const responseObject = {};
    Project.findAll({
      where: {
        category: req.params.category,
      },
    })
      .then((responseData) => {
        for (const ind in responseData) {
          if (Object.hasOwnProperty.call(responseData, ind)) {
            const projectId = responseData[ind].dataValues.id;
            Blob.destroy({
              where: {
                projectId,
              },
            })
              .then((responseBlob) => {
                Project.destroy({
                  where: {
                    id: projectId,
                  },
                })
                  .then((responseProject) => {
                    responseObject[`Blobs with projectId ${projectId}`] =
                      responseBlob;
                    responseObject[`Projects with id ${projectId}`] =
                      responseProject;
                  })
                  .catch((err) => {
                    console.error(err);
                    res.json(err);
                  });
              })
              .catch((err) => {
                console.error(err);
                res.json(err);
              });
          }
        }
        res.json(responseObject);
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  },
};
