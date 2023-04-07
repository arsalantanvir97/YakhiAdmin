import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import InputNumber from '../components/InputNumber';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getDetails, manageFees } from './Api/Auth';
import { Link } from 'react-router-dom';
import SwalAlert from '../components/SwalAlert';
import Toasty from '../utils/toast';

const ManageAppointmentFees = ({ history }) => {
    const [fees, setfees] = useState(0)
    const [date, setdate] = useState(null)

    const usequeryClient = new useQueryClient();
    const { isLoading: feedloading, data: appointmentfffe } = useQuery(["appointmentfees"], () =>
        getDetails(),
    );
    useEffect(() => {
        setdate(new Date(appointmentfffe?.date))
        setfees(appointmentfffe?.fees)
    }, [appointmentfffe])

    const { mutate, isLoading, status: promostatus } = useMutation((data) => manageFees(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Appointment Fees Updated Successfully');
            usequeryClient.invalidateQueries(['appointmentfees'])

            history.push("/Appointments");
        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const submitHandler = async () => {
        const body = {
            fees,
            date
        }
        mutate(body)
    };
    return (
        <div><div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body">
                    <section className="myprofile " id="configuration">
                        <div className="box py-5">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                        <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                                            history.goBack()
                                        }} /> Manage Appointment Fees</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-field">
                                                    <label htmlFor className="siteLabel ps-4 mb-2">Appointment Fees<span className="text-danger">*</span></label>
                                                    <div className="position-relative">
                                                        <InputNumber
                                                            value={fees}
                                                            onChange={setfees}
                                                            max={9}
                                                            className="siteInput"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-field">
                                                    <label htmlFor className="siteLabel ps-4 mb-2">Effective From Date<span className="text-danger">*</span></label>
                                                    <div className="position-relative">
                                                        {date == null || fees > 0 &&
                                                            <DatePicker
                                                                minDate={new Date()}
                                                                selected={date}
                                                                onChange={(date) =>
                                                                    setdate(date)
                                                                }
                                                                className="siteInput"
                                                            />}                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-field">
                                                    {!isLoading ? (
                                                        <Link
                                                            to="#" onClick={() => {
                                                                fees > 0
                                                                    ? submitHandler()
                                                                    : Toasty(
                                                                        "error",
                                                                        `Please fill out all the required fields!`
                                                                    );
                                                            }} className="btn_darkbluep">Update </Link>
                                                    ) : (
                                                        <i className="fas fa-spinner fa-pulse"></i>
                                                    )}                      </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="box py-5">
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <h3 className="pageTitle"> Appointments Logs</h3>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-xl-12 col-md-12">
                                    <div className="row">
                                        <div className="col d-lg-flex align-items-center justify-content-between">
                                            <form className="serchbarHead">
                                                <input type="email" name placeholder="Search...." />
                                                <button type="button"><i className="fas fa-search" /></button>
                                            </form>
                                            <div className="dropFilter">
                                                <button className="filterIcon redBg rounded-circle ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fas fa-filter" />
                                                </button>
                                                <div className="dropdown-menu filterDropdown">
                                                    <div className="filterDropdownHeader">
                                                        <p className="mainLabel m-0">Filter</p>
                                                    </div>
                                                    <div className="dropdown-divider" />
                                                    <div className="filterDropdownBody">
                                                        <div className="userInput mb-3">
                                                            <label htmlFor className="mainLabel">Creation Date:</label>
                                                            <div className="mb-2">
                                                                <input className="mainInput filterInput" type="date" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <input className="mainInput filterInput" type="date" />
                                                            </div>
                                                        </div>
                                                        <div className="userInput mb-3">
                                                            <label htmlFor className="mainLabel">Filter by Status:</label>
                                                            <div className="mb-2">
                                                                <select name id className="mainInput filterInput">
                                                                    <option value="s">Select Status</option>
                                                                    <option value={1}>Active</option>
                                                                    <option value={2}>Inactive</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="filterAction">
                                                            <button type="button" className="btn_darkbluep">Apply</button>
                                                        </div>
                                                        <div className="filterAction">
                                                            <button type="button" className="btn_orangebor">Clear All</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="maain-tabble table-responsive">
                                        <table className="table table-bordered zero-configuration">
                                            <thead>
                                                <tr>
                                                    <th>S No.</th>
                                                    <th>User Name</th>
                                                    <th>Booking ID</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark Jeson</td>
                                                    <td>Abc 123 </td>
                                                    <td>dd\mm\yyyy</td>
                                                    <td>$1234</td>
                                                    <td>Inproces</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-v" />
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li>
                                                                    <a className="dropdown-item" href="appointment-details-inprocess.php"><i className="fa fa-eye" /> View</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Mark Jeson</td>
                                                    <td>Abc 123 </td>
                                                    <td>dd\mm\yyyy</td>
                                                    <td>$1234</td>
                                                    <td>Pending</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-v" />
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li>
                                                                    <a className="dropdown-item" href="appointment-details-pending.php"><i className="fa fa-eye" /> View</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Mark Jeson</td>
                                                    <td>Abc 123 </td>
                                                    <td>dd\mm\yyyy</td>
                                                    <td>$1234</td>
                                                    <td>Completed</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-v" />
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li>
                                                                    <a className="dropdown-item" href="appointment-details-completed.php"><i className="fa fa-eye" /> View</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Mark Jeson</td>
                                                    <td>Abc 123 </td>
                                                    <td>dd\mm\yyyy</td>
                                                    <td>$1234</td>
                                                    <td>Reported</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-v" />
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li>
                                                                    <a className="dropdown-item" href="appointment-details-report.php"><i className="fa fa-eye" /> View</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-5 align-self-center">
                                    <div className="dataTables_info">Showing 10 out of 40 records</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate">
                                        <ul className="pagination justify-content-end mb-0">
                                            <li className="paginate_button page-item previous disabled"><a href="#" className="page-link">Previous</a></li>
                                            <li className="paginate_button page-item active"><a href="#" className="page-link">1</a></li>
                                            <li className="paginate_button page-item"><a href="#" className="page-link">2</a></li>
                                            <li className="paginate_button page-item"><a href="#" className="page-link">3</a></li>
                                            <li className="paginate_button page-item"><a href="#" className="page-link">4</a></li>
                                            <li className="paginate_button page-item next disabled" i><a href="#" className="page-link">Next</a></li>
                                        </ul>
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

export default ManageAppointmentFees