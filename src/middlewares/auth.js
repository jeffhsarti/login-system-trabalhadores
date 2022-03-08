const jwt = require("jsonwebtoken");
const config = require("../../config/app");

async function authValidation(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ error: "Token inválido." });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, config.secret, function (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Token inválido." });
    }
    return next();
  });
}

module.exports = authValidation;
