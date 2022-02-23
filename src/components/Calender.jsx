import React from "react";
import DatePicker from "react-datepicker";

const Calender = ({from,to,setFrom,
    setTo}) => {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
        <label htmlFor className="d-block">
          From
        </label>
        <DatePicker
          placeholderText="Select a starting date"
          selected={from}
          onChange={(from) => setFrom(from)}
          className="sort-date customdate form-control"
        />{" "}
      </div>
      <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
        <label htmlFor className="d-block">
          To
        </label>
        <DatePicker
          selected={to}
          placeholderText="Select an ending date"
          onChange={(to) => setTo(to)}
          className="sort-date customdate form-control"
        />{" "}
      </div>
    </>
  );
};

export default Calender;
