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
    //on server: .populate(path: "equipments")
    // path: melyik mező referenciájában keressen (itt 11. sor equipments) .populate(path: "equipments", select:["property"])
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
