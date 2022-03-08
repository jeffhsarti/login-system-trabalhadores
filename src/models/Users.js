const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_login: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "users",
    }
  );

  User.associate = (models) => {
    // create associations here
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  return User;
};
