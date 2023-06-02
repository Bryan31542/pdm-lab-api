const { Router } = require("express");
const { usersGetAll, usersGetOne, usersPost } = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { emailExist } = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGetAll);

router.get("/:id", usersGetOne);

router.post(
  "/",
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

module.exports = router;
