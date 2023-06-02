const { response } = require("express");
const User = require("../models/user");

const usersGetAll = (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  res.json({
    msg: "get API - controller",
    limit,
    skip,
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
