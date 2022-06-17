module.exports = (sequelize, Sequelize) => {
  const Blob = sequelize.define("blob", {
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileType: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    projectId: {
      type: Sequelize.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  return Blob;
};
