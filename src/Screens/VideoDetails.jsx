import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import { imageURL } from "../utils/api";
import { getInstructionDetails } from "./Api/Instructions";
const VideoDetails = ({ match, history }) => {

    const usequeryClient = new useQueryClient();

    const { isLoading: feedloading, data: instruction } = useQuery(["video", match.params.id], () =>
        getInstructionDetails(match.params.id),
    );
    return (
        <div>                                                {feedloading ? <Loader /> :

            <div className="app-content content uploadVideoMain">
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
                                                }} /> Video Details</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="felid">
                                                <label className="h_14 gray-colour">Video Title</label>
                                                <p className="h_16 text-black fw-bold qanelas">{instruction?.videotitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="felid">
                                                <label className="h_14 gray-colour">Video Description</label>
                                                <p className="h_16 text-black fw-bold qanelas">{instruction?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            {instruction?.videouri && (
                                                <video width="320" height="240" controls>
                                                    <source
                                                        src={`${imageURL}${instruction?.videouri}`}
                                                        type="video/ogg"
                                                    />
                                                </video>
                                            )}
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
    )
}

export default VideoDetails