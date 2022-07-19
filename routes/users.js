const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    user = await user.save();
    res.status(201).send(`Welcome, ${user.username}!`);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
