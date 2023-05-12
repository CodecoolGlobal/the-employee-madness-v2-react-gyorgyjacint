import { useEffect, useState } from "react";
import EmployeeTable from "../../Components/EmployeeTable";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

function EmployeeSearch() {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetch(`/api/employees/find/${name}`)
      .then(res => res.json())
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      });
    setLoading(false);
  }, [name]);

  if (loading) {
    return <Loading />;
  }
  if (employees) {
    return <EmployeeTable employees={employees} onDelete={handleDelete} />;
  }

  return <h1>Something went wrong</h1>;

}

export default EmployeeSearch;