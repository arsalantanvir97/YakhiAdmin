import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import Toasty from "../utils/toast";
import { EditingCategory, getCategoryDetails } from "./Api/Categories";
import { editTag, getTagDetails } from "./Api/Tags";

const EditTag = ({ match, history }) => {
    const usequeryClient = new useQueryClient();
    const [title, settitle] = useState("");
    const { isLoading, data: tagdetail } = useQuery(
        {
            queryKey: ["tag", match.params.id],
            queryFn: () =>
                getTagDetails(match.params.id),
        }
    );

    useEffect(() => {
        console.log('tagdetail', tagdetail)
        settitle(tagdetail?.data?.tag?.title);
    }, [tagdetail])
    const { mutate: editTags, isLoading: addTaxLoading } = useMutation((data) => editTag(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Tag Added Successfully');
            usequeryClient.invalidateQueries(['tags'])
            usequeryClient.invalidateQueries(['alltags'])
            usequeryClient.invalidateQueries(['tag', match.params.id])
            history.push("/Tags");

        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const EditTagHandler = async () => {
        const body = { title, id: match.params.id }
        editTags(body)
        settitle("");
    };


    return (
        <div>                  {isLoading ? <Loader /> :

            <div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body">
                    <section className="myprofile " id="configuration">
                        <div className="box py-5">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                        <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                                            history.goBack()
                                        }} /> Edit Tag</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-field">
                                        <label htmlFor className="siteLabel ps-4 mb-2">Tag<span className="text-danger">*</span></label>
                                        <div className="position-relative">
                                            <input type="text" value={title} onChange={(e) => {
                                                settitle(e.target.value)
                                            }} className="siteInput" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <Link to='#' onClick={() =>
                                        title?.length > 0
                                            ? EditTagHandler()
                                            : Toasty(
                                                "error",
                                                `Please fill out all the required fields!`
                                            )
                                    } className="btn_darkbluep">Update</Link>
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

export default EditTag