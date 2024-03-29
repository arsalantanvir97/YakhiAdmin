import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import FileSelector from "../components/FileSelector";
import { useMutation, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
import { createAEvent } from "./Api/Events";

const AddEvent = ({ history }) => {

  const usequeryClient = new useQueryClient();

  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(true);
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [date, setdate] = useState('');
  const [filetype, setfiletype] = useState('');

  const { mutate, isLoading, status } = useMutation((data) => createAEvent(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Event Created Successfully');
      usequeryClient.invalidateQueries(['events'])

      history.push("/Events");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
 
  const createEventHandler = async () => {
    console.log('createEventHandler')
    const formData = new FormData();
    formData.append("user_image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("date", date);
    formData.append("filetype", filetype);
    console.log('body', formData)
    const body = formData;
    mutate(body)
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
                            {!isLoading ? (
                              <button type="button" className="btn" data-toggle="modal" data-target="#updateEvent" onClick={() =>
                                title?.length > 0 &&
                                  image?.name?.length > 0 &&

                                  desc?.length > 0
                                  ? createEventHandler()
                                  : Toasty(
                                    "error",
                                    `Please fill out all the required fields!`
                                  )
                              }>
                                Add
                              </button>) : (
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