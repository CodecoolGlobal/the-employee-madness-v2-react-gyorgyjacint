// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  favorite_brand: {
    type: Schema.Types.ObjectId,
    ref: "Brands"
  },
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: "Equipment"
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
