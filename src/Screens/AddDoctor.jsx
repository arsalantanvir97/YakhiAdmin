import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import InputPhone from '../components/InputPhone';
import SwalAlert from '../components/SwalAlert';
import Toasty from '../utils/toast';
import { AddDoctorr } from './Api/Doctor';
import { getAlldoctorcategory } from './Api/DoctorCateogories';

const AddDoctor = ({ history }) => {
    const usequeryClient = new useQueryClient();

    const { isLoading: catloading, data: allofcategory } = useQuery(["alldoccats"], () =>
        getAlldoctorcategory()
    );
    const [category, setcategory] = useState()
    const [firstname, setfirstname] = useState()
    const [lastname, setlastname] = useState()
    const [phone, setphone] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [confirmpassword, setconfirmpassword] = useState()
    const [showicon, setshowicon] = useState(true);
    const [showicon2, setshowicon2] = useState(true);
    const { mutate, isLoading, status: promostatus } = useMutation((data) => AddDoctorr(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Doctor Added Successfully');
            usequeryClient.invalidateQueries(['doctors'])
            usequeryClient.invalidateQueries(['doccats'])

            usequeryClient.invalidateQueries(['alldoccats'])


            history.push("/Doctors");
        },
        onError: (err) => Error(err?.response?.data?.message),
    });
    const submitHandler = async () => {
        if (password !== confirmpassword) {
            Toasty(
                "error",
                `Password does not match!`
            )
        } else {
            console.log("await");
            const body = {
                category,
                firstname,
                lastname,
                phone,
                email,
                password
            }
            mutate(body)
        }
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
                                                }} /> Add Doctor</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Category<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <select value={category}
                                                        onChange={(e) => {
                                                            setcategory(e.target.value);
                                                        }}>
                                                        <option>Select Category</option>

                                                        {allofcategory?.length > 0 &&
                                                            allofcategory?.map((allcat) => (
                                                                <option value={allcat?._id}>
                                                                    {allcat?.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">First Name<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" value={firstname}
                                                        onChange={(e) => {
                                                            setfirstname(e.target.value);
                                                        }} className="siteInput" placeholder="Enter Frist Name" name id />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Last Name<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" value={lastname}
                                                        onChange={(e) => {
                                                            setlastname(e.target.value);
                                                        }} className="siteInput" placeholder="Enter Last Name" name id />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Phone Number<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <InputPhone value={phone} onChange={setphone} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Email Address<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="email" value={email}
                                                        onChange={(e) => {
                                                            setemail(e.target.value);
                                                        }} className="siteInput" placeholder="Enter Email Address" name id />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Password<span className="text-danger">*</span></label>
                                                <div className="passwordWrapper position-relative">
                                                    <input type={showicon ? "password" : "text"} value={password}
                                                        onChange={(e) => {
                                                            setpassword(e.target.value);
                                                        }} className="siteInput passInput" placeholder="Enter Password" name id />
                                                    <button type="button" className="passDisplay">
                                                        <i onClick={() => setshowicon(!showicon)}
                                                            className={
                                                                showicon
                                                                    ? "fas fa-eye-slash"
                                                                    : "fas fa-eye"
                                                            } aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Confirm Password<span className="text-danger">*</span></label>
                                                <div className="passwordWrapper position-relative">
                                                    <input type={showicon2 ? "password" : "text"} value={confirmpassword}
                                                        onChange={(e) => {
                                                            setconfirmpassword(e.target.value);
                                                        }} className="siteInput passInput" placeholder="Confirm Password" name id />
                                                    <button type="button" className="passDisplay">
                                                        <i onClick={() => setshowicon2(!showicon2)}
                                                            className={
                                                                showicon2
                                                                    ? "fas fa-eye-slash"
                                                                    : "fas fa-eye"
                                                            } aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {!isLoading ? (
                                                <Link
                                                    to="#"
                                                    onClick={() =>





                                                        firstname?.length > 0 &&
                                                            lastname?.length > 0 &&
                                                            password?.length > 0 &&
                                                            confirmpassword?.length > 0 &&

                                                            email?.length > 0
                                                            ? submitHandler()
                                                            : Toasty(
                                                                "error",
                                                                `Please fill out all the required fields!`
                                                            )
                                                    }
                                                    className="btn_darkbluep"
                                                >
                                                    Add
                                                </Link>
                                            ) : (
                                                <i className="fas fa-spinner fa-pulse"></i>
                                            )}
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

export default AddDoctor