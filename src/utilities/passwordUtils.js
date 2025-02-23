const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = process.env.PASSWORD_SALT;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {hashPassword, verifyPassword}