import React from "react";

const ShowEntries = ({ perPage, setPerPage, setPage, printDocument }) => {
  return (
    <div>
      {" "}
      <select
        className="w-100 form-control form-control-sm"
        value={perPage}
        onChange={(e) => {
          setPerPage(e.target.value);
          printDocument();
          setPage(1);
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default ShowEntries;
