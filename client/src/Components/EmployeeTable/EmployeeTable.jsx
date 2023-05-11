import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useEffect, useRef, useState } from "react";

const EmployeeTable = ({ employees, setEmployees, onDelete }) => {
  const [origEmployees, setOrigEmployees] = useState(employees);
  const [currentEmployees, setCurrentEmployees] = useState(employees);

  const [itemPerPage] = useState(10);
  const [pageFrom, setPageFrom] = useState(0);
  const [pageTo, setPageTo] = useState(10);
  const [page, setPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([...currentEmployees].slice(pageFrom, pageTo));
  const [maxPage, setMaxPage] = useState(Math.floor((currentEmployees.length - 1) / itemPerPage));

  const searchTherm = useRef(null);
  
  const [showSort, setShowSort] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [presentIds, setPresentIds] = useState([]);

  const [brands, setBrands] = useState(null);

  // #region Pagination

  const handleNextPage = () => {
    setCurrentPageData([...currentEmployees].slice(pageFrom + itemPerPage, pageTo + itemPerPage));

    setPageFrom(pageFrom + itemPerPage);
    setPageTo(pageTo + itemPerPage);
    setPage(page + 1);
  }
  
  const handlePrevPage = () => {
    setCurrentPageData([...currentEmployees].slice(pageFrom - itemPerPage, pageTo - itemPerPage));

    setPageFrom(pageFrom - itemPerPage);
    setPageTo(pageTo - itemPerPage);
    setPage(page - 1);
  }

  // update currentPageData on sorting
  useEffect(() => {
    setCurrentPageData([...currentEmployees].slice(pageFrom, pageTo));
  }, [currentEmployees]);
  
  useEffect(() => {
    //data update
    setOrigEmployees(employees);
    setCurrentEmployees(employees);
    
    //pagination
    if (employees.length <= pageFrom) {
      setPageFrom(pageFrom - itemPerPage);
      setPageTo(pageTo - itemPerPage);
      setPage(page - 1)
      setCurrentPageData([...employees].slice(pageFrom - itemPerPage, pageTo - itemPerPage));
    } else {
      setCurrentPageData([...employees].slice(pageFrom, pageTo));
    }
    setMaxPage(Math.floor((employees.length - 1) / itemPerPage));
  }, [employees]);


  // #endregion

  // #region Sorts

  const onSort = (e) => {
    setSortOrder( sortKey === e.target.value ? !sortOrder : true );
    setSortKey(e.target.value);
    // reset pagination and update:
  };

  useEffect(() => {
    if (sortKey === null) return;

    const direction = sortOrder ? 1 : -1;

    switch (sortKey) {
      case "first":
        setCurrentEmployees(
          structuredClone(currentEmployees)
          .sort((a,b) => a.name.split(" ")[0] < b.name.split(" ")[0] ? -direction : direction)
        );
        break;
      case "middle":
        // to be skipped - Robi
        break;
      case "last":
        setCurrentEmployees(
          structuredClone(currentEmployees)
          .sort((a,b) => {
            let lastNameA =  a.name.split(" ");
            let lastNameB = b.name.split(" ");
            lastNameA = lastNameA[lastNameA.length - 1];
            lastNameB = lastNameB[lastNameB.length - 1];
            return lastNameA < lastNameB ? -direction : direction;
          })
        );
        break;
      case "position":
        setCurrentEmployees(
          structuredClone(currentEmployees)
          .sort((a,b) => a.position < b.position ? -direction : direction)
        );
        break;
      case "level":
        setCurrentEmployees(
          structuredClone(currentEmployees)
          .sort((a,b) => a.level < b.level ? -direction : direction)
        );
        break;
      default:
        break;
    }

  }, [sortKey, sortOrder]);

  // #endregion

  // #region Filter

  const handleInput = (e) => searchTherm.current.value = e.target.value.toLowerCase();

  const handleReset = (e) => {
    setCurrentEmployees(origEmployees);
    setMaxPage(Math.floor(origEmployees.length / itemPerPage));
    searchTherm.current.value = "";
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const searchIn = e.target.option.value;
    //'position' or 'level'

    let newEmployeesData = structuredClone(employees).filter(employee => (
      employee[searchIn].toLowerCase().includes(searchTherm.current.value)
    ));
    setCurrentEmployees(newEmployeesData);
    setMaxPage(Math.floor(newEmployeesData.length / itemPerPage));
  };
  // #endregion

  // #region Attendance
  useEffect(() => {
    const presentData = JSON.parse(window.localStorage.getItem("present"));
    if (presentData) {
      setPresentIds(presentData);
    }
  }, []);
  
  const handleAttendance = (e, employeeId) => {
    let presentData = [...presentIds];
    if (e.target.checked) {
      presentData.push(employeeId)
    } else {
      const index = presentIds.indexOf(employeeId);
      presentData.splice(index, 1);
    }
    setPresentIds(presentData);
    window.localStorage.setItem("present", JSON.stringify(presentData));
  }

  const handleDelete = (id) => {
    onDelete(id);

    let presentData = JSON.parse(window.localStorage.getItem("present"));
    const presentDataIndex = presentData.indexOf(id);
    const presentIdsIndex = presentIds.indexOf(id);

    if (presentDataIndex !== -1) {
      presentData.splice(presentDataIndex, 1);
      window.localStorage.setItem("present", JSON.stringify(presentData));
    }

    if (presentIdsIndex !== -1) {
      const tempPresentIds = [...presentIds];
      tempPresentIds.splice(presentIdsIndex, 1);
      setPresentIds(tempPresentIds);
    }

  }
  // #endregion

  // #region FavoriteBrands

  useEffect(() => {
    fetch("/api/brands")
    .then(res => res.json())
    .then(brands => setBrands(brands))
  }, []);

  const getBrand = (employeeBrandId) => {
    return brands ? brands.find((brand) => brand._id === employeeBrandId).name : null ;
  }

  // #endregion

  return (
    <div className="EmployeeTable">
        <div className="filters">
          <form onSubmit={handleFilter} className="filterForm">
            <input
              name="searchTherm"
              type="text"
              className="filterFormInput"
              ref={searchTherm}
              onInput={handleInput}
            ></input>
            <div  className="filterFormBtns">
              <button type="submit">Search</button>
              <button onClick={handleReset}>Reset</button>
            </div>
            <select
              name="option"
              onChange={handleReset}
              className="filterFormSelect">
              <option
                value="position"
                >Position
              </option>
              <option
                value="level"
                >Level
              </option>
            </select>
          </form>

            {showSort ? (
            <>
            <button onClick={() => setShowSort(!showSort)}>Hide</button>
            <form className="sortButtons" onSubmit={(e) => e.preventDefault()}> Sort by:
              <button value="first" onClick={onSort}>First Name</button>
              {/*<button value="middle" onClick={onSort}>Middle Name</button>*/}
              <button value="last" onClick={onSort}>Last Name</button>
              <button value="position" onClick={onSort}>Position</button>
              <button value="level" onClick={onSort}>Level</button>
            </form>
            </>
            ) : (
              <button onClick={() => setShowSort(!showSort)}>Show</button>
            )}
        </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
            <th>Favorite brand</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleAttendance(e, employee._id)}
                  checked={presentIds.indexOf(employee._id) === -1 ? false : true}
                  >
                  </input>
              </td>
              <td>{getBrand(employee.favorite_brand) || "Loading..."}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginationBtns">
        <button
          onClick={handlePrevPage}
          disabled={page > 0 ? false : true}
          >Previous page
        </button>
        <p>{page + 1}/{maxPage + 1}</p>
        <button
          onClick={handleNextPage}
          disabled={page < maxPage ? false : true}
          >Next page
        </button>
      </div>

    </div>
  );
};

export default EmployeeTable;
