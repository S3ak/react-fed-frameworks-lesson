import { useState } from "react";

const norwegianCounties = [
  "Oslo",
  "Rogaland",
  "Møre og Romsdal",
  "Nordland",
  "Viken",
  "Innlandet",
  "Vestfold og Telemark",
  "Agder",
  "Vestland",
  "Trøndelag",
  "Troms og Finnmark",
];

const itemsPerPage = 3;

function SimpleCountyList() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(norwegianCounties.length / itemsPerPage);

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = norwegianCounties.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2>Norwegian Counties</h2>
      <ul>
        {currentItems.map((county, index) => (
          <li key={index}>{county}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SimpleCountyList;
