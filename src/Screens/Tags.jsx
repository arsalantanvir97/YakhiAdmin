import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import SwalAlert from "../components/SwalAlert";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
import { addTag, getTags } from "./Api/Tags";
import Toasty from "../utils/toast";

const Tags = ({ history }) => {
    const usequeryClient = new useQueryClient();

    const [sort, setsort] = useState();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchString, setSearchString] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [title, settitle] = useState("");

    // const [feedbacklogs, setfeedbacklogs] = useState([]);

    const { isFetching, isLoading, data, status: prodstatus, refetch } = useQuery({
        queryKey: ["tags", page,
            perPage,
            from,
            to,
            searchString,

            sort],
        queryFn: () => getTags(page,
            perPage,
            from,
            to,
            searchString,

            sort,),
        keepPreviousData: true

    });
    const { mutate: addTags, isLoading: addTaxLoading } = useMutation((data) => addTag(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Tag Added Successfully');
            usequeryClient.invalidateQueries(['tags'])
            usequeryClient.invalidateQueries(['alltags'])

            
        },
        onError: (err) => Error(err?.response?.data?.message),
    });

    const addTagHandler = async () => {
        const body = { title }
        addTags(body)
        settitle("");
    };

    return (
        <div>                                                {isLoading ? <Loader /> :

             <div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body">
                    <section className="myprofile " id="configuration">
                        <div className="box py-5">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                        <h3 className="pageTitle"> Products</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <ul className="nav nav-tabs tabTop justify-content-center" id="myTab" role="tablist">
                                    <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                                        <button onClick={() => {
                                            history?.push('/Categories')
                                        }} className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                                    </li>
                                    <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                                        <button onClick={() => {
                                            history?.push('/Products')
                                        }} className="nav-link" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                                    </li>
                                    <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                                        <button className="nav-link active" id="tags-tab" data-bs-toggle="tab" data-bs-target="#tags" type="button" role="tab" aria-controls="tags" aria-selected="true">Tags</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="categories" role="tabpanel" aria-labelledby="categories-tab">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <div className="form-field">
                                                    <label htmlFor className="siteLabel ps-4 mb-2">Tag<span className="text-danger">*</span></label>
                                                    <div className="position-relative d-flex gap-1">
                                                        <input value={title} onChange={(e) => {
                                                            settitle(e.target.value)
                                                        }} type="text" className="siteInput" />
                                                        <button className="btn_darkbluep flex-shrink-0" onClick={() =>
                                                            title?.length > 0
                                                                ? addTagHandler()
                                                                : Toasty(
                                                                    "error",
                                                                    `Please fill out all the required fields!`
                                                                )
                                                        }>Add Tag</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-12">
                                                    <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                                                        <h3 className="pageTitle"> Tags</h3>
                                                        <div>
                                                            {/* <a href="add-category.php" class="btn_darkbluep">Add Categories</a> */}
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
                                                            />                                                            <div className="dropFilter">
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
                                                                            />
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
                                                        &gt;
                                                        <table className="table table-bordered zero-configuration">
                                                            <thead>
                                                                <tr>
                                                                    <th>S No.</th>
                                                                    <th>Tag Name</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.docs?.length > 0 &&
                                                                    data?.docs?.map(
                                                                        (tag, index) => (
                                                                            <tr>
                                                                                <td>{index + 1}</td>
                                                                                <td>{tag?.title}</td>
                                                                                <td>
                                                                                    <div className="dropdown">
                                                                                        <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                            <i className="fa fa-ellipsis-v" />
                                                                                        </button>
                                                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                            <li>
                                                                                                <Link to={`/EditTag/${tag?._id}`} className="dropdown-item" href="edit-tag.php"><i className="fa fa-eye" /> View</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
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
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>}
        </div>
    )
}

export default Tags