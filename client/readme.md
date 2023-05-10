# changed files for tasks

## Extend the list with filters
  ### client:
  - m src/Components/EmployeeTable/EmployeeTable.jsx
  - m src/Pages/Employee/EmployeeList.jsx

## Extend thelist with arrangement features
  ### client:
  - m src/Components/EmployeeTable/EmployeeTable.jsx

## Company equipment
  ### client:
  - m src/Pages/index.js
  - c src/Pages/Equipment/EquipmentPage.jsx
  - c src/Pages/Equipment/EquipmentUpdater.jsx
  - c src/Pages/Equipment/EquipmentCreator.jsx //todo
  ### server:
  - m server.js
  - c db/equipment.model.js

## The search
  ### client:
  - c src/Pages/Employee/EmployeeSearch.jsx
  ### server
  - m server/server.js

## OPT: Pagination
  ### client:
  - c src/Components/EmployeeTable/EmployeeTable.jsx

## OPT: Employee attendance
  ### client:
  - m src/Components/EmployeeTable/EmployeeTable.jsx
  - m src/index.js
  - c src/Pages/Employee/Missing.jsx

## OPT: Favorite brand
  ### client:
  - m src/Components/EmployeeForm/EmployeeForm.jsx
  - m src/Components/EmployeeTable/EmployeeTable.jsx
  ### server:
  - c db/favoriteBrand.model.js
  - c populate/brands.json
  - m db/employee.model.js
  - m populate/populate.js
  - m server/server.js