import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import Toasty from "../utils/toast";
import { editdoctorcategory, getdoctorcategoryDetails } from './Api/DoctorCateogories';

const EditDoctorCategory = ({match,history}) => {
    const usequeryClient = new useQueryClient();
    const [title, settitle] = useState("");
    const { isLoading, data: catdetail } = useQuery(
        {
            queryKey: ["docdet", match.params.id],
            queryFn: () =>
                getdoctorcategoryDetails(match.params.id),
        }
    );

    useEffect(() => {
        console.log('catdetail', catdetail)
        settitle(catdetail?.data?.doctorCategory?.title);
    }, [catdetail])
    const { mutate: editCats, isLoading: addTaxLoading } = useMutation((data) => editdoctorcategory(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Category Edited Successfully');
            usequeryClient.invalidateQueries(['doccats'])

            usequeryClient.invalidateQueries(['alldoccats'])
            usequeryClient.invalidateQueries(['docdet', match.params.id])
            history.push("/DoctorCategories");

        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const EditCatHandler = async () => {
        const body = { title, id: match.params.id }
        editCats(body)
        settitle("");
    };

    return (
        <div>
                              {isLoading ? <Loader /> :
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
                                                }} /> Edit Category</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Category Name<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" value={title} onChange={(e) => {
                                                        settitle(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <Link to='#' onClick={() =>
                                                title?.length > 0
                                                    ? EditCatHandler()
                                                    : Toasty(
                                                        "error",
                                                        `Please fill out all the required fields!`
                                                    )
                                            } className="btn_darkbluep" data-bs-toggle="modal" data-bs-target=".editCategory_sufl"> Update</Link>
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

export default EditDoctorCategory