const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.get("/", controller.findAllUsers);
router.get("/:id", controller.findUserById);
router.post("/", controller.addUsers);
router.delete("/:id", controller.deleteUser);

module.exports = router;
