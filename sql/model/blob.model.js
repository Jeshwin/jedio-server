module.exports = (sequelize, Sequelize) => {
  const Blob = sequelize.define('blob', {
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileType: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    fileBin: {
      type: Sequelize.BLOB('medium'),
    },
    isThumbnail: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    projectId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    orderNum: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  })

  return Blob
}
