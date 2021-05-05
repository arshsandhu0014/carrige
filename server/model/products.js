const mongoose = require("mongoose");

//FIXME:  units
const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255,
  },
  itemCode: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 255,
  },
  itemName: {
    type: String,
    required: true,
    max: 255,
  },
  size: {
    type: Number,
    default: 0,
  },
  units: {
    type: String,
    default: "Kg",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  costPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  sellingPrice: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "Rupess",
  },
  isnew: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdByDate: {
    type: Date,
    default: Date.now(),
  },
  updatedByDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", productSchema);
