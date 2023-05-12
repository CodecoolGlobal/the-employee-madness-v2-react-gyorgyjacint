import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

function EquipmentUpdater() {
  const [loading, setLoading] = useState(true);
  const [allEquipments, setAllEquipments] = useState(null);
  const [equipments, setEquipments] = useState(null);
  const [searchTherm, setSearchTherm] = useState("");

  useEffect(() => {
    fetch("/api/equipment/")
    .then(res => res.json())
    .then(data => {
      setEquipments(data);
      setAllEquipments(data);
    });

    setLoading(false);
  }, [])

  useEffect(() => {
    setEquipments(allEquipments);
  }, [allEquipments])
  
  const onDelete = (id) => {
    fetch(`/api/equipment/${id}`, {method: "DELETE"})
    .then(res => {
      if (res.ok) {
        setAllEquipments([...allEquipments].filter(equipment => equipment._id !== id));
        setSearchTherm("");
      }
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.value.toLowerCase();
    setSearchTherm(input);

    const newEqList = [...allEquipments].filter(equipment => equipment.name.toLowerCase().includes(input));
  
    setEquipments(newEqList);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="equipmentUpdater">
      <h1>Equipments</h1>
      <div className="searchEquipment">
        <label htmlFor="eqFormInput"> Search Equipment:</label>
        <br/>
        <input
          name="searchTherm"
          id="eqFormInput"
          placeholder="Search equipment"
          value={searchTherm}
          onChange={handleSearch}>
        </input>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipments && equipments.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>
                <Link to={`/equipment/update/${equipment._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(equipment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentUpdater;