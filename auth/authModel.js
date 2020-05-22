
const db = require("../database/dbConfig");

//i have added this file to create some functions that i can uses to insert auth credentials into.

module.exports = {
  find,
  insert,
  findByUsername,
};

function find() {
  return db("users");
}

function insert(user) {
  return db("users").insert(user);
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}