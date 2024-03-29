import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import EmployeeList from "./Pages/Employee/EmployeeList";
import EmployeeCreator from "./Pages/Employee/EmployeeCreator";
import EmployeeUpdater from "./Pages/Employee/EmployeeUpdater";
import EmployeeSearch from "./Pages/Employee/EmployeeSearch";
import Missing from "./Pages/Employee/Missing";

import EquipmentList from "./Pages/Equipment/EquipmentList";
import EquipmentUpdater from "./Pages/Equipment/EquipmentUpdater";
import EquipmentCreator from "./Pages/Equipment/EquipmentCreator";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/search/:name",
        element: <EmployeeSearch />,
      },
      {
        path: "/missing",
        element: <Missing />
      },
      {
        path: "/equipment",
        element: <EquipmentList />
      },
      {
        path: "/equipment/update/:id",
        element: <EquipmentUpdater />
      },
      {
        path: "/equipment/create/",
        element: <EquipmentCreator />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
