const { response } = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Check credentials",
      });
    }

    // check if password is correct
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Check credentials",
      });
    }

    // generate JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  login,
};
