import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useEffect, useRef, useState } from "react";

const EmployeeTable = ({ employees, setEmployees, onDelete }) => {
  const [origEmployees] = useState(employees);
  const [currentEmployees, setCurrentEmployees] = useState(employees);
/*
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pageFrom, setPageFrom] = useState(0);
  const [pageTo, setPageTo] = useState(10);
  const [page, setPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([...currentEmployees].slice(pageFrom, pageTo));
  const [maxPage] = useState(Math.floor(origEmployees.length / itemPerPage));
*/
  const searchTherm = useRef(null);

  const [showSort, setShowSort] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  // #region Pagination
/*
  //update from-to if page changes
  const handleNextPage = () => {
    setCurrentPageData([...currentEmployees].slice(pageFrom + itemPerPage, pageTo + itemPerPage))

    setPageFrom(pageFrom + itemPerPage);
    setPageTo(pageTo + itemPerPage);
    setPage(page + 1)
  }
  const handlePrevPage = () => {
    setCurrentPageData([...currentEmployees].slice(pageFrom - itemPerPage, pageTo - itemPerPage))

    setPageFrom(pageFrom - itemPerPage);
    setPageTo(pageTo - itemPerPage);
    setPage(page - 1)
  }
*/

  // #endregion

  // #region Sorts

  const onSort = (e) => {
    setSortOrder( sortKey === e.target.value ? !sortOrder : true );
    setSortKey(e.target.value);
  };

  useEffect(() => {
    if (sortKey === null) return;

    const direction = sortOrder ? 1 : -1;

    switch (sortKey) {
      case "first":
        setCurrentEmployees(
          structuredClone(employees)
          .sort((a,b) => a.name.split(" ")[0] < b.name.split(" ")[0] ? -direction : direction)
        );
        break;
      case "middle":
        // to be skipped - Robi
        break;
      case "last":
        setCurrentEmployees(
          structuredClone(employees)
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
          structuredClone(employees)
          .sort((a,b) => a.position < b.position ? -direction : direction)
        );
        break;
      case "level":
        setCurrentEmployees(
          structuredClone(employees)
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
    setEmployees(origEmployees);
    console.log("orig",origEmployees)
    searchTherm.current.value = "";
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const searchIn = e.target.option.value;
    //'position' or 'level'

    let newEmployeesData = structuredClone(origEmployees).filter(employee => (
      employee[searchIn].toLowerCase().includes(searchTherm.current.value)
    ));
    setCurrentEmployees(newEmployeesData);
  };
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
            <th />
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<div className="paginationBtns">
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
      </div>*/}
    </div>
  );
};

export default EmployeeTable;
