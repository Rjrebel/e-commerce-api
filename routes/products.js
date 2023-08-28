const express = require("express");
const router = express.Router();

const productsController = require("../controller/products_controller");

router.post("/create", productsController.create);
router.get("", productsController.getProducts);
router.delete("/:id", productsController.delete);
router.post("/:id/update_quantity", productsController.update);

module.exports = router;
