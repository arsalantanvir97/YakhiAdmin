import React, { useEffect, useState } from "react";
import { baseURL, imageURL } from "../utils/api";
import FileSelector from "../components/FileSelector";
import DatePicker from "react-datepicker";
import moment from "moment";
import SwalAlert from "../components/SwalAlert";
import { EditingEvent, getEventDetails } from "./Api/Events";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";

const EditEventt = ({ match, history }) => {
  const [loading, setloading] = useState(false);
  const usequeryClient = new useQueryClient();


  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(false);
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [date, setdate] = useState('');
  const [filetype, setfiletype] = useState('');

  const { isLoading, data: eventData } = useQuery(
    {
      queryKey: ["event", match.params.id],
      queryFn: () =>
        getEventDetails(match.params.id),

    }
  );
  useEffect(() => {
    settitle(eventData?.data?.event?.title);
    setdesc(eventData?.data?.event?.desc);
    setdate(eventData?.data?.event?.date);
    // setStatus(eventData?.data?.event?.status);
    setfiletype(eventData?.data?.event?.filetype)
    setimage(eventData?.data?.event?.file);


  }, [eventData])

  // const handleGetEvent = async () => {
  //   try {
  //     const res = await axios({
  //       url: `${baseURL}/event/geteventsdetails/${match?.params?.id}`,
  //       method: "GET",

  //       headers: {
  //         Authorization: `Bearer ${adminInfo.token}`
  //       }
  //     });
  //     console.log("res", res);
  //     settitle(res?.data?.event?.title);
  //     setdesc(res?.data?.event?.desc);
  //     setdate(res?.data?.event?.date);
  //     // setStatus(res?.data?.event?.status);
  //     setfiletype(res?.data?.event?.filetype)
  //     setimage(res?.data?.event?.file);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const { mutate, isLoading: editeveloading } = useMutation((data) => EditingEvent(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Event Edited Successfully');

      usequeryClient.invalidateQueries(['events'])
      usequeryClient.invalidateQueries(['event', match.params.id])
      history.push("/Events");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  const updateEventData = async () => {
    console.log("createEventHandler");
    setloading(true);
    const formData = new FormData();
    formData.append("user_image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("date", date);
    formData.append("filetype", filetype);
    formData.append("id", match?.params?.id);

    const body = formData;
    mutate(body)
  };
  return (
    <><div>
      {isLoading ? <Loader /> :
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
                              <h1>Edit Event</h1>
                            </div>
                          </div>
                        </div>
                        <div className="row addEventsSec">
                          <div className="col-lg-7">
                            {is_edit &&
                              <>
                                <FileSelector
                                  setImage={setimage}
                                  image={image}
                                  is_edit={is_edit}
                                  setfiletype={setfiletype}
                                  filetype={filetype}
                                />

                                <h6>(Size Should be Max 5MB)</h6>
                              </>}
                            {!is_edit && filetype?.includes('video') &&
                              <video
                                style={{ marginBottom: 7 }}
                                width="100%vw"
                                height="440"
                                controls
                                src={`${imageURL}${image?.length > 0 &&
                                  image
                                  }`}

                              />
                            }
                            {!is_edit && filetype?.includes('image') && <img src={`${imageURL}${image?.length > 0 &&
                              image
                              }`} alt="" className="img-fluid mb-2" />}
                            <form>
                              <div className="mb-3">
                                <label>Event Title</label>
                                {is_edit ? (
                                  <input type="text" className="form-control" defaultValue="Title ABC" value={title}
                                    onChange={(e) => {
                                      settitle(e.target.value);
                                    }} />) : (
                                  <p>{title} </p>
                                )}{" "}
                              </div>
                              <div className="mb-3">
                                <label>Event Date</label>
                                {is_edit ? (
                                  <DatePicker
                                    minDate={new Date()}
                                    selected={new Date(date)}
                                    onChange={(date) =>
                                      setdate(date)
                                    }
                                    className="sort-date customdate form-conform-controltrol"
                                  />
                                ) : (
                                  <p>{moment
                                    .utc(date)
                                    .format("LL")} </p>
                                )}{" "}
                              </div>
                              <div className="mb-3">
                                <label>Description</label>
                                {is_edit ? (

                                  <textarea className="form-control" rows={3} value={desc}
                                    onChange={(e) => {
                                      setdesc(e.target.value);
                                    }} />) : (
                                  <p>{desc} </p>
                                )}{" "}
                              </div>
                              {!editeveloading ? (
                                <button type="button" onClick={() => {
                                  if (!is_edit) {
                                    setIsEdit(true);
                                  } else {
                                    updateEventData();
                                  }
                                }} className="btn" data-toggle="modal" data-target="#updateEvent"> {is_edit ? "Update" : "Edit"}</button>) : (
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
        </div>}
    </div>
    </>
  )
}

export default EditEventt