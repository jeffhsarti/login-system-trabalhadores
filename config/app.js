const { PORT, JWT_SECRET } = process.env;

module.exports = {
  port: PORT,
  secret: JWT_SECRET,
};
