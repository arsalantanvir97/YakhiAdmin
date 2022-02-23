import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../utils/api";

export default function ImageSelector({
  setImage,
  image,
  is_edit,
  className,
  custom_style,
}) {
  const [defaultImage, setDefaultImage] = useState();
  const imageRef = useRef();

  useEffect(() => {
    setDefaultImage(`${imageURL}${image}`);
    if (image && typeof image !== "string") {
      const objectURL = URL.createObjectURL(image);
      setDefaultImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [image]);

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(setImage);
    setImage(file);
  };

  return (
    <div>
      {image ? (
        <img
          onClick={is_edit ? showOpenFileDialog : null}
          src={defaultImage}
          alt=""
          className={className ? className : "img-fluid"}
          style={
            custom_style
              ? custom_style
              : {
                  width: 128,
                  height: 128,
                  borderRadius: 60,
                  cursor: "pointer",
                }
          }
        />
      ) : (
        <div
          style={{
            height: 150,
            width: 150,
            border: "1px solid #E8E8E8",
            background: "#FCF9F9",
            borderRadius: 15,
            padding: 10,
            textAlign: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={is_edit ? showOpenFileDialog : null}
        >
          <i
            className="fa fa-upload"
            style={{
              fontSize: 50,
              color: "#999999",
              marginTop: 28,
            }}
          />
          <p className="mt-1">Upload Image</p>
        </div>
      )}

      <div className="input-group " onClick={showOpenFileDialog}>
        <div className="input-group-append m-0">
          {/* <div className="d-flex align-items-center">
            {is_edit && (
              <Link
                to="#"
                className="browse btn btn-transparent upload d-grey f-20"
              >
                <img
                  src="images/upload-icon.png"
                  alt=""
                //   className="img-fluid ml-1"
                />
                Change Image
              </Link>
            )}
          </div> */}
        </div>
      </div>
      <input
        ref={imageRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
    </div>
  );
}
