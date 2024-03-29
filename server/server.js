require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/favoriteBrand.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//

app.get("/api/equipment/", async (req, res) => {
  const equipment = await EquipmentModel.find().sort({ name: "asc" });
  return res.json(equipment);
});

app.get("/api/equipment/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
  } catch (error) {
    return res.json({message: "invalid id"})
  }
});

app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find()
    .populate("equipments").populate("favorite_brand").sort({ created: "desc" });

  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("equipments").populate("favorite_brand");
  return res.json(employee);
});

app.get("/api/employees/find/:name", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({name: {$regex: req.params.name, $options: 'i'}})
      .populate("equipments").populate("favorite_brand");

    return res.json(employees);
  } catch (error) {
    res.status(400).json({message: "Not found"});
  }
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/brands", async (req,res) => {
  try {
    const brands = await BrandModel.find();
    res.json(brands)
  } catch (error) {
    res.status(400).json({message: error})
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
