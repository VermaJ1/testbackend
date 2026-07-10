const express = require("express");
const user = express.Router();
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controller/user.controller");

user.post("/", createUser);
user.get("/", getUsers);
user.get("/:id", getUser);
user.put("/:id", updateUser);
user.delete("/:id", deleteUser);

module.exports = user;
