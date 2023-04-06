import moment from 'moment/moment';
import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import Graph from '../components/Graph';
import { getRevenueSales } from './Anayltics';
import { getCategories } from './Api/Categories';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Revenue = ({ history }) => {
    // const [hideDownload, sethideDownload] = useState(false);

    const inputRef = useRef(null);

    const [year4, setyear4] = useState("2023");
    const [year5, setyear5] = useState("2023");

    const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
        getCategories()
    );
    const {isLoading, data: analyticsdata } = useQuery(["revenue", year4, year5
    ], () =>
        getRevenueSales(year4, year5
        ),
        console.log('abc',)
    );


    const getCatName = (id) => {
        let data = allofcategory?.find(o => o?._id == id);
        return data?.categorytitle
    }
    const printDocument = async () => {
        // await sethideDownload(true);

        html2canvas(inputRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape"
            });
            const imgProps = pdf.getImageProperties(imgData);
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, 0, width, height);
            pdf.save("order.pdf");
        });
        // sethideDownload(false);
    };


    // const addHandler=()=>{

    // }
    return (
        <div>
                                                {isLoading ? <Loader /> :
 <div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body dashCard">
                    {/* Basic form layout section start */}
                    <section id="configuration">
                        <div className="row dashboardMain">
                            <div className="col-12">
                                <div className="py-5 px-5 mb-5">
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-md-12">
                                            <div className="d-block d-md-flex justify-content-between align-items-center">
                                                <h3 className="pageTitle"> Analytics</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <ul className="nav nav-tabs tabTop" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button onClick={() => {
                                                    history?.push('/Analytics')
                                                }} className="nav-link " id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="false">Overview</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button  className="nav-link active" id="revenue-tab" data-bs-toggle="tab" data-bs-target="#revenue" type="button" role="tab" aria-controls="revenue" aria-selected="true">Revenue</button>
                                            </li>
                                            <li onClick={() => {
                                                    history?.push('/AnalyticsOrder')
                                                }}  className="nav-item" role="presentation">
                                                <button className="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false">Orders</button>
                                            </li>
                                            <li  onClick={() => {
                                                history?.push('/AnalysisProducts')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                                            </li>
                                            <li onClick={() => {
                        history?.push('/AnalysisCategories')
                      }}  className="nav-item" role="presentation">
                                                <button className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalyticsVariation')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="variations-tab" data-bs-toggle="tab" data-bs-target="#variations" type="button" role="tab" aria-controls="variations" aria-selected="false">Variations</button>
                                            </li>
                                            <li onClick={() => {
                                                    history?.push('/Taxes')
                                                }}  className="nav-item" role="presentation">
                                                <button className="nav-link" id="taxes-tab" data-bs-toggle="tab" data-bs-target="#taxes" type="button" role="tab" aria-controls="taxes" aria-selected="false">Taxes</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/Coupans')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="coupons-tab" data-bs-toggle="tab" data-bs-target="#coupons" type="button" role="tab" aria-controls="coupons" aria-selected="false">Coupons</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">

                                            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                                {/* Order Summary */}
                                                <div className="row mb-5">
                                                    <div className="col-12 col-md-12">
                                                        <div className>
                                                            <div className="col-xl-2 col-md-6 col-12">
                                                                <label htmlFor className="d-block">Select Year</label>
                                                                <select className="w-100 form-control sort-select"
                                                                    name
                                                                    id
                                                                    value={year4}
                                                                    onChange={(e) => {
                                                                        setyear4(e.target.value);
                                                                    }}
                                                                >
                                                                    <option>Year</option>
                                                                    <option value={"2020"}>2020</option>
                                                                    <option value={"2021"}>2021</option>
                                                                    <option value={"2022"}>2022</option>
                                                                    <option value={"2023"}>2023</option>
                                                                    <option value={"2024"}>2024</option>
                                                                    <option value={"2025"}>2025</option>
                                                                    <option value={"2026"}>2026</option>
                                                                    <option value={"2027"}>2027</option>
                                                                </select>

                                                            </div>
                                                            <div className="card-dashboard p-0 mb-3">
                                                                <div className="row">
                                                                    <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center">
                                                                                        <div className="card-title">Gross SALE</div>
                                                                                        <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Net Sales</div>
                                                                                        <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Promocodes</div>
                                                                                        <h3>$0</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Total Sales</div>
                                                                                        <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Taxes</div>
                                                                                        <h3>$0</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="chart-main position-relative mb-5">
                                                                <div className="row">
                                                                    <div className="col-xl-2 col-md-6 col-12">
                                                                        <label htmlFor className="d-block">Select Year</label>
                                                                        <select className="w-100 form-control sort-select"
                                                                            name
                                                                            id
                                                                            value={year5}
                                                                            onChange={(e) => {
                                                                                setyear5(e.target.value);
                                                                            }}
                                                                        >
                                                                            <option>Year</option>
                                                                            <option value={"2020"}>2020</option>
                                                                            <option value={"2021"}>2021</option>
                                                                            <option value={"2022"}>2022</option>
                                                                            <option value={"2023"}>2023</option>
                                                                            <option value={"2024"}>2024</option>
                                                                            <option value={"2025"}>2025</option>
                                                                            <option value={"2026"}>2026</option>
                                                                            <option value={"2027"}>2027</option>
                                                                        </select>

                                                                    </div>
                                                                    <div className="col-12 col-xl-12 text-center py-3">
                                                                        <Graph
                                                                            graph_data={analyticsdata?.orderbysalesgraph}
                                                                            label='Gross Sales'
                                                                        />                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray p-3 mb-3">
                                                                <div className="row mb-2">
                                                                    <div className="col-12 d-flex align-content-center justify-content-between tckt-srch-row">
                                                                        <h3 className="pageTitle mb-0 text-red">Revenue</h3>
                                                                        <div>
                                                                            <Link to='#' onClick={printDocument} className="fw-semibold h_20 pe-3 text-primary text-underline">Download</Link>
                                                                            {/* <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Top Categories Items Sold */}
                                                                <div className="row mb-3">
                                                                    <div className="col-12 col-md-12">
                                                                        <div className>
                                                                            <div className="main-tabble table-responsive">
                                                                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer px-0">
                                                                                    <div className="row">
                                                                                        <div className="col-sm-12">
                                                                                            <table id="divToPrint"
                                                                                                ref={inputRef} className="table table-borderless dataTable">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>Date</th>
                                                                                                        <th>Orders</th>
                                                                                                        <th>Gross sales</th>
                                                                                                        <th>Promocodes</th>
                                                                                                        <th>Net sales</th>
                                                                                                        <th>Taxes</th>
                                                                                                        <th>Total sales</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {analyticsdata?.revenuebydayOrder
                                                                                                        ?.length > 0 && analyticsdata?.revenuebydayOrder
                                                                                                            ?.map(lim => (
                                                                                                                <tr>
                                                                                                                    <td>{moment
                                                                                                                        .utc(lim?.data?.[0]?.
                                                                                                                            createdAt)
                                                                                                                        .format("LL")}</td>
                                                                                                                    <td>{lim?.data?.length}</td>
                                                                                                                    <td>${lim?.count}</td>
                                                                                                                    <td>$0</td>
                                                                                                                    <td>$0</td>
                                                                                                                    <td>$0</td>
                                                                                                                    <td>${lim?.count}</td>
                                                                                                                </tr>))}


                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Top Categories Items Sold */}
                                                                {/* <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="d-flex">
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">Days:</h5>
                                                                                <p>{analyticsdata?.revenuebydayOrder
                                                                                                        ?.length}</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">orders:</h5>
                                                                                <p>{analyticsdata?.revenuebydayOrder}</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">Gross sales:</h5>
                                                                                <p>$200</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">Promocodes:</h5>
                                                                                <p>$20</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">Net sales:</h5>
                                                                                <p>07</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">taxes:</h5>
                                                                                <p>$200</p>
                                                                            </div>
                                                                            <div className="d-flex me-5">
                                                                                <h5 className="me-1 fw-semibold">Total sales:</h5>
                                                                                <p>$200</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Order Summary */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>}</div>
    )
}

export default Revenue