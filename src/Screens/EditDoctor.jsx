import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import InputPhone from "../components/InputPhone";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import Toasty from "../utils/toast";
import { EditingCategory, getCategoryDetails } from "./Api/Categories";
import { editDoctor, getDoctorDetails } from "./Api/Doctor";
import { getAlldoctorcategory } from "./Api/DoctorCateogories";
import { editTag, getTagDetails } from "./Api/Tags";

const EditDoctor = ({ match, history }) => {
    const usequeryClient = new useQueryClient();
    const [category, setcategory] = useState()
    const [firstname, setfirstname] = useState()
    const [lastname, setlastname] = useState()
    const [phone, setphone] = useState()
    const [email, setemail] = useState()
    const { isLoading: catloading, data: allofcategory } = useQuery(["alldoccats"], () =>
        getAlldoctorcategory()
    );


    const { isLoading, data: doctordetail } = useQuery(
        {
            queryKey: ["doctor", match.params.id],
            queryFn: () =>
                getDoctorDetails(match.params.id),
        }
    );

    useEffect(() => {
        console.log('doctordetail', doctordetail)
        setcategory(doctordetail?.data?.doctor?.category);
        setfirstname(doctordetail?.data?.doctor?.firstname);
        setlastname(doctordetail?.data?.doctor?.lastname);
        setphone(doctordetail?.data?.doctor?.phone);
        setemail(doctordetail?.data?.doctor?.email);
    }, [doctordetail])

    const { mutate, isLoading: editloading, status: promostatus } = useMutation((data) => editDoctor(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Doctor Edited Successfully');
            usequeryClient.invalidateQueries(['doctors'])
            usequeryClient.invalidateQueries(['doccats'])
            usequeryClient.invalidateQueries(['doctor', match.params.id])

            usequeryClient.invalidateQueries(['alldoccats'])


            history.push("/Doctors");
        },
        onError: (err) => Error(err?.response?.data?.message),
    });
    const submitHandler = async () => {
        console.log("await");
        const body = {
            category,
            firstname,
            lastname,
            phone,
            email,
            id: match.params.id
        }
        mutate(body)
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
                                                }} /> Edit Doctor</h3>
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
                                                        <option>Select Category</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">First Name<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" className="siteInput" value={firstname}
                                                        onChange={(e) => {
                                                            setfirstname(e.target.value);
                                                        }} placeholder="Enter Frist Name" name id />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Last Name<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" className="siteInput" value={lastname}
                                                        onChange={(e) => {
                                                            setlastname(e.target.value);
                                                        }} placeholder="Enter Last Name" name id />
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
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {!editloading ? (
                                                <Link
                                                    to="#"
                                                    onClick={() =>





                                                        firstname?.length > 0 &&
                                                            lastname?.length > 0 &&

                                                            email?.length > 0
                                                            ? submitHandler()
                                                            : Toasty(
                                                                "error",
                                                                `Please fill out all the required fields!`
                                                            )
                                                    }
                                                    className="btn_darkbluep"
                                                >
                                                    Edit
                                                </Link>
                                            ) : (
                                                <i className="fas fa-spinner fa-pulse"></i>
                                            )}                                            <Link to={`/DoctorPassword/${match.params.id}`} className="btn_orangebor ms-2">Edit Password</Link>
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

export default EditDoctor