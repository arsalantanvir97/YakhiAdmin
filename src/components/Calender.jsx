import React from "react";
import DatePicker from "react-datepicker";

const Calender = ({from,to,setFrom,
    setTo}) => {
  return (
    <>
 {/* <div className="mb-2">
                                  <input className="mainInput filterInput" type="date" />
                                </div>
                                <div className="mb-2">
                                  <input className="mainInput filterInput" type="date" />
                                </div>
                              </div>
 */}

      <div className="mb-2">
        {/* <label htmlFor className="d-block">
          From
        </label> */}
        <DatePicker
          placeholderText="Select a starting date"
          selected={from}
          onChange={(from) => setFrom(from)}
          className="mainInput filterInput"
        />{" "}
      </div>
      <div className="mb-2">
        {/* <label htmlFor className="d-block">
          To
        </label> */}
        <DatePicker
          selected={to}
          placeholderText="Select an ending date"
          onChange={(to) => setTo(to)}
          className="mainInput filterInput"
        />{" "}
      </div>
    </>
  );
};

export default Calender;
