const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// Get all users
const usersGetAll = async (req = request, res = response) => {
  // default limit and skip
  const { limit = 5, skip = 0 } = req.query;

  const query = {};

  // we will show the total number of users and the users that are active
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(skip)),
  ]);

  // sending the response
  res.json({
    total,
    users,
  });
};
const usersGetOne = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "getOne API - controller",
    id,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  // check if user exists

  // encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // save in db
  await user.save();
  res.status(201).json({
    msg: "User Created Successfully",
  });
};

module.exports = {
  usersGetAll,
  usersGetOne,
  usersPost,
};
