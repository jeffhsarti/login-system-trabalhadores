const jwt = require("jsonwebtoken");

async function authValidation(req, res, next) {
  const auth = req.headers["Authorization"];
  if (!auth) {
    return res.status(401).json({ error: "Token inválido." });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err) {
    if (err) {
      return res.status(401).json({ error: "Token inválido." });
    }
    return next();
  });
}

module.exports = authValidation;
