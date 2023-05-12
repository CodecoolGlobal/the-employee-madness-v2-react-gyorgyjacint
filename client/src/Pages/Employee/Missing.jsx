import { useEffect, useState } from "react";
import EmployeeTable from "../../Components/EmployeeTable";
import Loading from "../../Components/Loading";

const fetchAllEmployees = () => {
  return fetch("/api/employees/").then(res => res.json());
}

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const Missing = () => {
  const [loading, setLoading] = useState(true);
  const [missingEmployees, setMissingEmployees] = useState(null);
  const [didReset, setDidReset] = useState(false);  

  useEffect(() => {
    fetchAllEmployees()
    .then(employees => {
      const presentIds = JSON.parse(window.localStorage.getItem("present"));
      let missingEmployeesData = [];
      let showAll = ( presentIds === null );

      employees.forEach(employee => {
        if (showAll || !presentIds.includes(employee._id)) {
          missingEmployeesData.push(employee);
        }
      });
      setMissingEmployees(missingEmployeesData);
      setLoading(false);
    })
  }, [])

  const handleDelete = (id) => {
    deleteEmployee(id);

    setMissingEmployees((missingEmployees) => {
      return missingEmployees.filter((employee) => employee._id !== id);
    });
  };

  const handleAttendanceReset = () => {
    window.localStorage.removeItem("present");
    setDidReset(true);
  }

  if (loading) {
    return <Loading />
  }

  if (didReset) {
    return <h1>Attendance resetted!</h1>
  }

  return (
    <div className="missingEmployees">
        {missingEmployees ? (
          <>
            <h1>Missing Employees</h1>
            <EmployeeTable employees={missingEmployees} onDelete={handleDelete}/>
          </>
          ) : (
            <h1>Everyone is present!</h1>
            )
          }
          <button onClick={handleAttendanceReset}>Reset attendance</button>
    </div>

  );
}

export default Missing;