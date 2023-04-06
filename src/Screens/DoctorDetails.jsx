import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { getDoctorDetails } from './Api/Doctor';

const DoctorDetails = ({ match,history }) => {
    const [doctorrdetails, setdoctorrdetails] = useState()
    const { isLoading, data: doctordetail } = useQuery(
        {
            queryKey: ["doctor", match.params.id],
            queryFn: () =>
                getDoctorDetails(match.params.id),
        }
    );

    useEffect(() => {
        setdoctorrdetails(doctordetail?.data?.doctor);
    }, [doctordetail])

    return (
        <div>
                  {isLoading ? <Loader /> :
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
                                        }}/> Doctor Details</h3>
                                        <div>
                                            <Link to={`/DoctorAvailibilites/${doctorrdetails?._id}`} className="btn_orangebor me-3">Manage Availability</Link>
                                            <Link to={`/EditDoctor/${doctorrdetails?._id}`} className="btn_darkbluep">Edit Details</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-9">
                                    <form className="myprofile_main">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-4 text-center">
                                                    <div className="attached">
                                                        <img src="../../images/myprofile_pic.png" className="img-fluid ml-0" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-2">
                                                <div className="felid">
                                                    <label className="h_14 gray-colour">Category</label>
                                                    <p className="h_16 text-black fw-bold">{doctorrdetails?.category?.title}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="felid">
                                                    <label className="h_14 gray-colour">Name</label>
                                                    <p className="h_16 text-black fw-bold">{doctorrdetails?.firstname + ' ' + doctorrdetails?.lastname}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="felid">
                                                    <label className="h_14 gray-colour">Email</label>
                                                    <p className="h_16 text-black fw-bold">{doctorrdetails?.email}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="felid">
                                                    <label className="h_14 gray-colour">Phone Number</label>
                                                    <p className="h_16 text-black fw-bold">{doctorrdetails?.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="box py-5">
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
                        </div> */}
                    </section>
                </div>
            </div>
        </div>}
        </div>
    )
}

export default DoctorDetails