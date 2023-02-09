import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../utils/api";
import Toasty from "../utils/toast";

export default function FileSelector({
    setImage,
    image,
    is_edit,
    className,
    isdocument,
    custom_style,
    filetype,
    setfiletype
}) {
    const [defaultImage, setDefaultImage] = useState();
    const imageRef = useRef();
    console.log('isdocument', isdocument);
    useEffect(() => {
        setDefaultImage(`${imageURL}${image}`);
        if (image && typeof image !== "string") {
            const objectURL = URL.createObjectURL(image);
            setDefaultImage(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        }
        else {
            console.log('avxc')
        }
    }, [image]);

    const showOpenFileDialog = () => {
        imageRef.current.click();
    };

    const handleChange = (event) => {
        console.log('esasd', event.target.files[0])
        if (event.target.files[0].size > 5000000) {
            Toasty(
                "error",
                `Please upload files with size less than 5MB!`
            )
        } else {
            const file = event.target.files[0];
            console.log(setImage);
            setImage(file);
            setfiletype(event.target.files[0].type)
        }
    };
   

    return (
        <div>
            {image ? (
                <img
                    onClick={is_edit ? showOpenFileDialog : null}
                    src={filetype?.includes('video') ? 'images/placeholder-video.png' : defaultImage}
                    alt=""
                    className={className ? className : "img-fluid"}
                    style={
                        custom_style
                            ? custom_style
                            : {
                                width: 128,
                                height: 128,
                                borderRadius: 60,
                                cursor: is_edit ? "pointer" : 'cursor'
                            }
                    }
                />
            ) : (
                <div
                    style={{
                        height: 150,
                        width: isdocument ? '100%' : 150,
                        border: "1px solid #E8E8E8",
                        background: "#FCF9F9",
                        borderRadius: 15,
                        padding: 10,
                        textAlign: "center",
                        justifyContent: "center",
                        cursor: is_edit ? "pointer" : 'cursor'
                    }}
                    onClick={is_edit ? showOpenFileDialog : null}
                >
                    <i
                        className="fa fa-upload"
                        style={{
                            fontSize: 50,
                            color: "#999999",
                            marginTop: 28
                        }}
                    />
                    {!isdocument &&
                        <p className="mt-1">Upload Video or Image</p>}
                </div>
            )}

            <div className="input-group my-1" onClick={showOpenFileDialog}>
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
                  className="img-fluid mr-1"
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
                accept="video/*,image/*"
                onChange={handleChange}
                onClick={(event) => {
                    event.target.value = null;
                }}
            />
        </div>
    );
}
