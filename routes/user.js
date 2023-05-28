const { Router } = require("express");
const { usersGetAll, usersGetOne, usersPost } = require("../controllers/user");

const router = Router();

router.get("/", usersGetAll);

router.get("/:id", usersGetOne);

router.post("/", usersPost);

module.exports = router;
