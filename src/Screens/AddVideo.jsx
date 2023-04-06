import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import SwalAlert from '../components/SwalAlert';
import Toasty from '../utils/toast';
import { addInstruction } from './Api/Instructions';

const AddVideo = ({ history }) => {
    const usequeryClient = new useQueryClient();

    const [ad_video, setad_video] = useState();
    const [videotitle, setvideotitle] = useState();
    const [description, setdescription] = useState();
    const { mutate: addInstructions, isLoading: addInstructionLoading } = useMutation((data) => addInstruction(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Video Uploaded Successfully');
            usequeryClient.invalidateQueries(['instructions'])

            history.push("/Video");
        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const filedocsHandler = (e) => {
        console.log("eeee", e?.target?.files[0]);
        setad_video(e?.target?.files[0]);
    };

    const addInstructionHandler = async () => {
        const formData = new FormData();

        formData.append("ad_video", ad_video);
        formData.append("videotitle", videotitle);
        formData.append("description", description);
        const body = formData;
        addInstructions(body)
        setad_video("");
        setvideotitle("");
        setdescription("");
    };

    return (
        <div><div className="app-content content uploadVideoMain">
            <div className="content-wrapper">
                <div className="content-body">
                    {/* Basic form layout section start */}
                    <section id="configuration">
                        <div className="row">
                            <div className="col-12">
                                <div className="card-content collapse show dashCard py-5 px-5">
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-md-12">
                                            <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                                <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                                                    history.goBack()
                                                }} /> Add Video</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Video Title<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" value={videotitle}
                                                        onChange={(e) => {
                                                            setvideotitle(e.target.value);
                                                        }} className="siteInput" placeholder="Enter Title" name id />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Video Description*<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <textarea value={description}
                                                        onChange={(e) => {
                                                            setdescription(e.target.value);
                                                        }} placeholder="Enter Video Description" className="pt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Upload File<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <img src="images/uploadFileIcon.png" alt="uploadFileIcon" />
                                                    <input type="file"
                                                        accept="video/mp4,video/x-m4v,video/*"
                                                        onChange={filedocsHandler} className="uploadFileIcon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">{addInstructionLoading ? <i className="fas fa-spinner fa-pulse"></i> :
                                            <Link to='#' onClick={() =>
                                                videotitle?.length > 0 &&
                                                    ad_video?.name?.length > 0 &&
                                                    description?.length > 0
                                                    ? addInstructionHandler()
                                                    : Toasty(
                                                        "error",
                                                        `Please fill out all the required fields!`
                                                    )
                                            } className="btn_darkbluep" data-bs-toggle="modal" data-bs-target=".videoAdded_sufl">Add</Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddVideo