const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/readProductCustomer", controller.readProductCustomer);
router.get("/detailProduct/:slug", controller.detailProduct);
// router.use(authentication)
router.post("/addProduct", controller.addProduct);
router.post("/addCategory", controller.addCategory);
router.get("/readProduct", controller.readProduct);
router.get("/readCategory", controller.readCategory);
router.delete("/destroyProduct/:id", controller.destroyProduct);
router.patch("/editProduct/:id", controller.editProduct);
router.delete("/destroyCategory/:id", controller.destroyCategory);
module.exports = router;
