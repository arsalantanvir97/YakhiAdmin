import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import { baseURL } from "../utils/api";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import FileSelector from "../components/FileSelector";

const AddEvent = ({ history }) => {
  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(true);
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [date, setdate] = useState('');
  const [filetype, setfiletype] = useState('');

  const createEventHandler = async () => {
    console.log("createEventHandler");
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("user_image", image);
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("date", date);
      formData.append("filetype", filetype);
      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/event/createevents`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      setloading(false);

      console.log("res", res);
      if (res?.status == 201) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "Event Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("blockkk2");

        history.push("/Events");
        console.log("blockkk3");
      }
    } catch (error) {
      console.log("error", error?.response?.data);
      setloading(false);

      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

 
  return (
    <><div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="user-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Add New Event</h1>
                          </div>
                        </div>
                      </div>
                      <div className="row addEventsSec">
                        <div className="col-lg-7">
                          <FileSelector
                            setImage={setimage}
                            image={image}
                            is_edit={is_edit}
                            setfiletype={setfiletype}
                            filetype={filetype}
                          />
                          <h6>(Size Should be Max 5MB)</h6>
                          {/* <div className="eventImageUpload text-center mb-3"><a href="#"><i className="fas fa-upload" /></a><h5>Upload Video or Photo</h5><h6>(Size Should be Max 5MB)</h6></div> */}
                          {/* <div className="row ">
                            <div className="col-lg-6 mt-2 userss">
                              <label className="all-label2 mb-1 d-block">
                                Upload a Video or Image*:
                              </label>

                              <div
                                className="file-inpt"
                                style={{ display: "flex" }}
                              >
                                <input
                                  type="file"
                                  accept="video/mp4,video/x-m4v,video/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <i className="fas fa-cloud-upload-alt ml-1 mt-1" />
                              </div>
                              <h5 className="mt-1" style={{ fontSize: 'bold' }}>
                                Size Should be Max 5MB
                              </h5>
                              <p id="duration" className="mt-1">
                                {ad_video?.name?.length > 0 &&
                                        "Duration:"} 
                              </p>
                            </div>
                          </div> */}
                          <form>
                            <div className="mb-3">
                              <label>Event Title</label>
                              <input type="text" className="form-control" placeholder="Enter Title" value={title}
                                onChange={(e) => {
                                  settitle(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                              <label>Event Date</label>
                              <DatePicker
                                minDate={new Date()}
                                selected={date}
                                onChange={(date) =>
                                  setdate(date)
                                }
                                className="sort-date customdate form-conform-controltrol"
                              />
                            </div>
                            <div className="mb-3">
                              <label>Description</label>
                              <textarea className="form-control" placeholder=" Abc" rows={3} value={desc}
                                onChange={(e) => {
                                  setdesc(e.target.value);
                                }} />
                            </div>
                            {!loading ? (
                              <button type="button" className="btn" data-toggle="modal" data-target="#updateEvent" onClick={() =>
                                title?.length > 0 &&
                                  image?.name?.length > 0 &&

                                  desc?.length > 0
                                  ? createEventHandler()
                                  : Toasty(
                                    "error",
                                    `Please fill out all the required fields!`
                                  )
                              }>Add</button>) : (
                              <i className="fas fa-spinner fa-pulse"></i>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Add Sub Employee Popup */}

    </div>
    </>
  )
}

export default AddEvent