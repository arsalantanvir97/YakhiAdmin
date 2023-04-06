import React from "react";

const SearchFilter = ({
  searchString,
  setSearchString,
  setPage,
  functionhandler
}) => {
  return (
    <form className="serchbarHead">
    <input type="email"  value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
          setPage(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            functionhandler();
          }
        }} name placeholder="Search...." />
    <button type="button"><i className="fas fa-search" /></button>
  </form>
    // <div>
    //   {" "}
    //   <input
    //     type="search"
    //     className="form-control form-control-sm"
    //     placeholder="Search"
    //     value={searchString}
    //     onChange={(e) => {
    //       setSearchString(e.target.value);
    //       setPage(1);
    //     }}
    //     onKeyDown={(e) => {
    //       if (e.key === "Enter") {
    //         functionhandler();
    //       }
    //     }}
    //   />
    // </div>
  );
};

export default SearchFilter;
