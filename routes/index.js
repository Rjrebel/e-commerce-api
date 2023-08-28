const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));

router.get("/", (req, res) => {
  res.status(200).send("Welcome to Ecommerce API");
});

console.log("router loaded");

module.exports = router;
