module.exports = (sequelize, Sequelize) => {
  const crypto = require("crypto");

  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING(127),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(7),
      defaultValue: "9000",
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
  });

  User.generateSalt = () => crypto.randomBytes(16).toString("base64");

  User.encryptPassword = (password, salt) =>
    crypto.createHash("RSA-SHA256").update(password).update(salt).digest("hex");

  const setSaltAndPassword = (user) => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  User.prototype.correctPassword = function (enteredPassword) {
    return (
      User.encryptPassword(enteredPassword, this.salt()) === this.password()
    );
  };

  return User;
};
