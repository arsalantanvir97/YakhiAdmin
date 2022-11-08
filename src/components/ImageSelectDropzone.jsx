// components/simple-dropzone.component.js
import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import Swal from "sweetalert2";

const ImageSelectDropzone = ({
  files,
  setFiles,
  accept,
  setproductimage,
  max
}) => {
  //

  const handleChangeStatus = ({ meta, file }, status) => {
      const temp_arr = [...files];
  
      
 
      if (status === "done") {
        temp_arr.push(file);
      }
      if (status === "removed") {
        const index = temp_arr.findIndex(
          (arr_file) => file.lastModified === arr_file.lastModified
        );
        if (index !== -1) temp_arr.splice(index, 1);
      }
      setFiles(temp_arr);

      setproductimage({ ...temp_arr });
   
  };

  return <Dropzone maxFiles={max} onChangeStatus={handleChangeStatus} accept={accept} />;
};

export default ImageSelectDropzone;
