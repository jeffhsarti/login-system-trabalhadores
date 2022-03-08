const express = require("express");
const handle = require("express-async-handler");
const validator = require("express-joi-validation").createValidator({});

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const { User } = require("../../models");
const validators = require("../../validators");
const authValidation = require("../../middlewares/auth");

router.get(
  "/",
  authValidation,
  validator.query(validators.user.get),
  handle(async (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to get the specific user or all users.' */
    try {
      const users = await User.findAll({
        where: req.query,
        attributes: ["id", "username", "email", "last_login"],
      });
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to list users." });
    }
  })
);

router.post(
  "/",
  validator.body(validators.user.post),
  handle(async (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to create users.' */
    try {
      const user = req.body;
      const alreadyExistsEmailPromise = User.findOne({
        where: { email: user.email },
      });
      const alreadyExistsUsernamePromise = User.findOne({
        where: { username: user.username },
      });
      const [alreadyExistsEmail, alreadyExistsUsername] = await Promise.all([
        alreadyExistsEmailPromise,
        alreadyExistsUsernamePromise,
      ]);
      if (alreadyExistsEmail || alreadyExistsUsername) {
        return res.status(400).json({ error: "User already exists." });
      }

      const salt = await bcrypt.genSalt(8);
      const hash = await bcrypt.hash(user.password, salt);
      user.id = uuidv4();
      user.password = hash;
      await User.create(user);
      return res.status(201).json({
        email: user.email,
        username: user.username,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "User creation failed." });
    }
  })
);

router.put(
  "/:id",
  authValidation,
  validator.params(validators.user.userId),
  validator.query(validators.user.put),
  handle(async (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to update users.' */
    try {
      const { id } = req.params;
      const userData = req.body;

      const user = await User.findById(id);
      await user.update(userData);
      await user.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to update user." });
    }
  })
);

router.delete(
  "/:id",
  authValidation,
  validator.params(validators.user.userId),
  handle(async (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to remove users.' */
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ error: "User does not exists." });
      }

      await User.destroy(user);
      return res.status(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "User removal failed." });
    }
  })
);

module.exports = (app) => app.use("/user", router);
