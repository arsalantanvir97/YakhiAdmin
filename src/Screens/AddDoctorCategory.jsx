import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import SwalAlert from '../components/SwalAlert';
import Toasty from '../utils/toast';
import { adddoctorcategory } from './Api/DoctorCateogories';

const AddDoctorCategory = (props) => {
    const usequeryClient = new useQueryClient();

    const [title, settitle] = useState("");
    const { mutate: addDocCat, isLoading: addDocLoading } = useMutation((data) => adddoctorcategory(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Category Added Successfully');
            usequeryClient.invalidateQueries(['doccats'])
            usequeryClient.invalidateQueries(['alldoccats'])
props?.history?.push('/DoctorCategories')

        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const addCatHandler = async () => {
        const body = { title }
        addDocCat(body)
        settitle("");
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
                                                    props?.history.goBack()
                                                }} /> Add Category</h3>
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
                                                    }} placeholder="Enter Category Name" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            {addDocLoading?  <i className="fas fa-spinner fa-pulse"></i>:
                                            <Link to='#' onClick={() =>
                                                title?.length > 0
                                                    ? addCatHandler()
                                                    : Toasty(
                                                        "error",
                                                        `Please fill out all the required fields!`
                                                    )} className="btn_darkbluep" data-bs-toggle="modal" data-bs-target=".addedCategory_sufl"> Add</Link>}
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

export default AddDoctorCategory