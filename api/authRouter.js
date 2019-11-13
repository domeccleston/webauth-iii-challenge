const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../api/users/usersModel");

router.get("/", async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async (req, res) => {
  let newUser = req.body
  let { username, password, department } = req.body;

  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  if (!username || !password || !department) {
    res.status(401).json("Please enter all required fields");
  }

  try {
    const createdUser = await Users.createUser(newUser);
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
