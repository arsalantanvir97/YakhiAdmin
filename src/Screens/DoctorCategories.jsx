import moment from 'moment';
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom'
import Calender from '../components/Calender';
import Loader from '../components/Loader';
import Pagination from '../components/Padgination';
import SearchFilter from '../components/SearchFilter';
import { getdoctorcategory } from './Api/DoctorCateogories';

const DoctorCategories = () => {
    const usequeryClient = new useQueryClient();

    const [sort, setsort] = useState();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchString, setSearchString] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const { isFetching, isLoading, data, status: prodstatus, refetch } = useQuery({
        queryKey: ["doccats", page,
            perPage,
            from,
            to,
            searchString,

            sort],
        queryFn: () => getdoctorcategory(page,
            perPage,
            from,
            to,
            searchString,

            sort,),
        keepPreviousData: true

    });
    return (
        <div>
                  {isLoading ? <Loader /> :
<div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body">
                    {/* Basic form layout section start */}
                    <section id="configuration">
                        <div className="row">
                            <div className="col-12">
                                <div className="card-content collapse show dashCard py-5 px-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-12">
                                            <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                                <h3 className="pageTitle"> Manage Categories</h3>
                                                <div>
                                                    <Link to='/AddDoctorCategory' className="btn_darkbluep">Add Categories</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-xl-12 col-md-12">
                                            <div className="row">
                                                <div className="col d-lg-flex align-items-center justify-content-between">
                                                    <SearchFilter
                                                        searchString={searchString}
                                                        setSearchString={setSearchString}
                                                        setPage={setPage}
                                                    />                            <div className="dropFilter">
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
                                                                    <Calender
                                                                        from={from}
                                                                        to={to}
                                                                        setFrom={setFrom}
                                                                        setTo={setTo}
                                                                    />                              </div>
                                                                {/* <div className="userInput mb-3">
                                <label htmlFor className="mainLabel">Filter by Status:</label>
                                <div className="mb-2">
                                  <select name id className="mainInput filterInput">
                                    <option value="s">Select Status</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                  </select>
                                </div>
                              </div> */}
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
                                                            <th>Category</th>
                                                            <th>No Of Doctor</th>
                                                            <th>Last Modify Date</th>
                                                            {/* <th>Status</th> */}
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.docs?.length > 0 &&
                                                            data?.docs?.map(
                                                                (cat, index) => (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>{cat?.title}</td>
                                                                        <td>{cat?.doctorcount}</td>
                                                                        <td>                                                  {moment(cat?.createdAt).format(
                                                                            "LL"
                                                                        )}
                                                                        </td>
                                                                        {/* <td className="text-green">Active</td> */}
                                                                        <td>
                                                                            <div className="dropdown">
                                                                                <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <i className="fa fa-ellipsis-v" />
                                                                                </button>
                                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                    <li>
                                                                                        <Link className="dropdown-item" to={`/EditDoctorCategory/${cat?._id}`}><i className="fa fa-eye" /> Edit</Link>
                                                                                        {/* <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".active_popup"><i className="fa fa-eye" /> Active</a> */}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>)
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {data?.docs?.length > 0 && (
                                        <Pagination
                                            totalDocs={data?.totalDocs}
                                            totalPages={data?.totalPages}
                                            currentPage={data?.page}
                                            setPage={setPage}
                                            hasNextPage={data?.hasNextPage}
                                            hasPrevPage={data?.hasPrevPage}
                                        />
                                    )}
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

export default DoctorCategories