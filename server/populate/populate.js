/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");
const EmployeeModel = require("../db/employee.model");
const favoriteBrandModel = require("../db/favoriteBrand.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const createFavoriteBrands = async () => {
  await favoriteBrandModel.deleteMany({});

  
  const favorite_brands = brands.map(brand => ({
    name: brand
  }));

  await favoriteBrandModel.create(...favorite_brands);
  console.log("Brands created")
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brandList = await favoriteBrandModel.find();
  const brandIds = brandList.map(brand => brand._id);

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favorite_brand: pick(brandIds)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await createFavoriteBrands();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
