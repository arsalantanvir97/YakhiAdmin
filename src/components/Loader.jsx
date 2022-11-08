import React from "react";

const Loader = () => {
  return (
    <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div className="dots-5"></div>
      </div>
    </div>
  );
};

export default Loader;
