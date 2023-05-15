import { useEffect, useState } from "react";
import Loading from "../Loading";

const fetchBrands = () => (fetch("/api/brands"));
const fetchEquipments = () => (fetch("/api/equipment"));

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {

  const [brands, setBrands] = useState(null);
  const [equipments, setEquipments] = useState(null);
  const [employeeEquipments, setEmployeeEquipments] = useState(employee?.equipments ?? []);

  useEffect(() => {
    Promise.all([fetchBrands(), fetchEquipments()])
      .then(response => Promise.all(response.map((data) => data.json())))
      .then(([brands, equipments]) => {
        setBrands(brands);
        setEquipments(equipments);
      });
  }, []);

  const handleEquipmentAdd = (equipment) => {
    setEmployeeEquipments([...employeeEquipments, equipment]);
  };

  const handleEquipmentDelete = (e) => {
    e.preventDefault();
    const delIndex = employeeEquipments.findIndex(equipment => equipment === e.target.value);
    const newEquipmentList = structuredClone(employeeEquipments);
    newEquipmentList.splice(delIndex, 1);
    setEmployeeEquipments(newEquipmentList);
  }


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    employee.equipments = employeeEquipments;
    
    return onSave(employee);
    
  };

  if (!brands || !equipments) {
    return <Loading />;
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="favorite_brand">Favorite brand:</label>
        <select name="favorite_brand" defaultValue={employee ? employee.favorite_brand : brands[0]._id}>
          {brands.map(brand => (
            <option
              key={brand._id}
              value={brand._id}
              >{brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="equipments">Equipments:</label>
        <select name="equipments" defaultValue={equipments[0]}>
          {equipments.map(equipment => (
            <option
              key={equipment._id}
              value={equipment._id}
              onClick={() => handleEquipmentAdd(equipment)}
              >{equipment.name}
            </option>
          ))}
        </select>
        <div className="currentEquipment">
            {employeeEquipments.map(equipment => (
              <button
                key={(Math.random()*100000) + equipment._id}
                value={equipment._id}
                onClick={handleEquipmentDelete}
                >{equipments.find((e) => e._id === equipment._id).name}
                </button>
            ))}
        </div>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
