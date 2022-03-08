const bcrypt = require("bcryptjs");
const uuid = require("uuidv4");

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
      hooks: {
        beforeCreate: (record) => {
          const id = uuid();
          record.dataValues.id = id;

          bcrypt.genSalt(8, (err, salt) => {
            if (err) {
              throw new Error(err);
            }
            bcrypt.hash(record.dataValues.password, salt, function (err, hash) {
              if (err) {
                throw new Error(err);
              }
              record.dataValues.password = hash;
            });
          });
        },
        beforeUpdate: (record) => {
          bcrypt.genSalt(8, (err, salt) => {
            if (err) {
              throw new Error(err);
            }
            bcrypt.hash(record.dataValues.password, salt, function (err, hash) {
              if (err) {
                throw new Error(err);
              }
              record.dataValues.password = hash;
            });
          });
        },
      },
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
