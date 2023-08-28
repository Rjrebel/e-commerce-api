const Product = require("../models/Product");

// Fetching all habits
module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Creating a habit
module.exports.create = async (req, res) => {
  try {
    const { name, quantity } = req.body; 

    const product = new Product({
      name,
      quantity,
    });

    const savedProduct = await product.save();

    res.status(200).json({ date : savedProduct});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Deleting the habit
module.exports.delete = async (req, res) => {
  try {
    // Find a habit to be deleted and check if it exists
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // actually deleting the habit
    product = await Product.findByIdAndDelete(req.params.id);
    return res.json({ data : {  message: "Product successfully deleted" }});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Updating the status of habit on particular date
module.exports.update = async (req, res) => {
  try {

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }


    let newProduct = { name: product.name, quantity: req.query.number };

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );

    return res.json({ data : {message: "Updated successfully.", product: product} });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error.", error });
  }
};
