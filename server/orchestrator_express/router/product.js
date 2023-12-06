const express = require("express");
const router = express.Router();
const controller = require("../controller/product");

router.post("/addProduct", controller.addProduct);
router.get("/getAllProduct", controller.findAllProduct);
router.get("/detailProduct/:slug", controller.findDetailProduct);
router.delete("/deleteProduct/:id", controller.deleteProduct);
router.patch("/editProduct/:id", controller.editProduct);
module.exports = router;
