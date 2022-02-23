import React from "react";

const SearchFilter = ({
  searchString,
  setSearchString,
  setPage,
  functionhandler
}) => {
  return (
    <div>
      {" "}
      <input
        type="search"
        className="form-control form-control-sm"
        placeholder="Search"
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
          setPage(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            functionhandler();
          }
        }}
      />
    </div>
  );
};

export default SearchFilter;
