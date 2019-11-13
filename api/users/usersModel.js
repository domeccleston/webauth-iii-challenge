const db = require("../../data/dbConfig");

function getUsers() {
  return db("users");
}

function createUser(userDetails) {
  return db("users").insert(userDetails);
}

function findBy(parameter) {
  return db("users").where(parameter);
}

module.exports = {
  getUsers,
  createUser,
  findBy
};
