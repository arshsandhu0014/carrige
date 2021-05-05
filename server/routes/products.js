const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const token = require("./verifyToken");
const Product = require("../model/Products");

let productId = 20;
let itemCode = 20;

router.use(bodyParser.json());
//TODO: Get All Products
router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (error) {
    res.json({ message: error });
  }
});
//TODO: Get Specific Product
router.get("/:Id", async (req, res) => {
  try {
    const Product = await Product.findById(req.params.Id);
    res.json(Product);
  } catch (error) {
    res.json({ message: error });
  }
});
//TODO: Add New Product FIXME: Auto-genrate productCode itemCode
router.post("/", async (req, res) => {
  productId ++;
  itemCode ++;
  const Products = new Product({
    productCode: "SHP" + productId,
    itemCode: "ITM" + itemCode,
    itemName: req.body.itemName,
    size: req.body.size,
    quantity: req.body.quantity,
    costPrice: req.body.costPrice,
    sellingPrice: req.body.sellingPrice,
    currency: req.body.currency,
    units: req.body.units,
  });
  try {
    const saveProduct = await Products.save();
    res.json(saveProduct);
  } catch (error) {
    res.json({ message: error });
  }
});
//TODO: Update Specific Product
router.patch("/:Id", async (req, res) => {
  try {
    const Product = await Product.updateOne(
      { _id: req.params.Id },
      {
        $set: {
          itemName: req.body.itemName,
          size: req.body.size,
          quantity: req.body.quantity,
          costPrice: req.body.costPrice,
          sellingPrice: req.body.sellingPrice,
        },
      }
    );
    res.json(Product);
  } catch (error) {
    res.json({ message: error });
  }
});
//TODO: Delete Specific Product
router.delete("/:Id", token, async (req, res) => {
  try {
    const Product = await Product.remove({ _id: req.params.Id });
    res.json(Product);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
