import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";

function EquipmentUpdater() {
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(`/api/equipment/${id}`)
    .then(res => res.json())
    .then(data => {
      setName(data.name);
      setType(data.type);
      setAmount(data.amount);
    })

    setLoading(false)
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (amount == null) return;
    fetch(`/api/equipment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        type,
        amount
      })
    })
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="eqipmentUpdater">
      <h1>Update equipment</h1>
      <div className="euWrapper">
        <label htmlFor="fName">Name:</label>
        <input
          id="fName"
          type="text"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required={true}/>
        <label htmlFor="fType">Type:</label>
        <input 
          id="fType" 
          type="text"
          value={type} 
          onChange={(e) => setType(e.target.value)}
          required={true}/>
        <label htmlFor="fAmount">Amount:</label>
        <input 
          id="fAmount" 
          type="number"
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          required={true}/>
        <button className="euBtn" onClick={handleUpdate}>Update</button>
        <Link to="/equipment">
          <button className="euBtn">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default EquipmentUpdater;