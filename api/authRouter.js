const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')
const Users = require("../api/users/usersModel");

router.get("/users", restricted, async (req, res) => {
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

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user)
        res.status(200).json({ message: `Welcome ${user.username}, ${token}`})
      } else if (!user) {
        res.status(404).json({ message: "User does not exist! "})
      } else {
        res.status(401).json({ message: "Credentials are invalid"});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid credentials, token not valid'});
      } else {
        req.decodedJwt = decodedToken;
        console.log('Decoded Token: ', req.decodedJwt);
        next();
      }
    })
  }
}

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
