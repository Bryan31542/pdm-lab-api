const { Router } = require("express");
const { check } = require("express-validator");

const { usersPost } = require("../controllers/user");

const { login, WhoAmI } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { emailExist } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailExist),
    check("password", "password must have more than 8 digits").isLength({
      min: 8,
    }),
    validateFields,
  ],
  usersPost
);

router.get("/whoami", [validateJWT], WhoAmI);

module.exports = router;
