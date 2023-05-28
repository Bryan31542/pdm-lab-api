const { response } = require("express");

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

const usersPost = (req, res = response) => {
  const { name, email, password } = req.body;
  res.json({
    msg: "post API - controller",
    body,
  });
};

module.exports = {
  usersGetAll,
  usersGetOne,
  usersPost,
};
