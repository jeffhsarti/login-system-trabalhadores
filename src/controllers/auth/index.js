const express = require("express");
const handle = require("express-async-handler");
const validator = require("express-joi-validation").createValidator({});
const jwt = require("jsonwebtoken");

const router = express.Router();

const { User } = require("../../models");
const validators = require("../../validators");
const config = require("../../../config/app");

router.post(
  "/login",
  validator.body(validators.auth.login),
  handle(async (req, res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to login with user credentials.'
        #swagger.path = '/auth/login'  */
    try {
      const { username, password } = req.body;
      const user = await User.findOne({where: { username }});
      
      if (user) {
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
          const token = jwt.sign({ username: username }, config.secret, {
            expiresIn: '1d'
          });
          user.update({last_login: new Date()});
          user.save();
          return res.status(200).json({token});
        }
      }

      return res.status(401).json({error: "Invalid credentials"});
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Failed to authenticate user."});
    }
  })
);

module.exports = (app) => app.use("/auth", router);
