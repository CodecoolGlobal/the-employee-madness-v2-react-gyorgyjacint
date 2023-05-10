const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "general"
  },
  amount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);