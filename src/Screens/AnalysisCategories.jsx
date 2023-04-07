import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { getCategories } from './Api/Categories';
import Graph from "../components/Graph";
import { handleGetcategoriesummarydata, handleGettopCategoriestemsSolddata } from './Api/Dashboard';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const AnalysisCategories = ({ history }) => {
    const [category, setcategory] = useState("");
    const [categorytitle, setcategorytitle] = useState('Tonics');
    const inputRef = useRef(null);

    const [year5, setyear5] = useState("2023");
    const [year4, setyear4] = useState("2023");
    const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
        getCategories()
    );

    const { isLoading,data: categoriesummarydata } = useQuery(["categoriesummary", year4, category
    ], () =>
        handleGetcategoriesummarydata(year4, category
        ),
        console.log('abc',)
    );
    const {isloading:topCategoriesLoading, data: topCategoriestemsSolddata } = useQuery(["topCategoriestemsSold", year5
    ], () =>
        handleGettopCategoriestemsSolddata(year5
        ),
        console.log('abc',)
    );



    const getCatName = (id) => {
        let data = allofcategory?.find(o => o?._id == id);
        return data?.categorytitle
    }
    const settingDataHandler = (data) => {
        const dataa = JSON.parse(data)
        console.log('data', dataa, dataa?._id)
        setcategory(dataa?._id)
        setcategorytitle(dataa?.categorytitle)

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
            pdf.save("data.pdf");
        });
        // sethideDownload(false);
    };
    return (
        <div>
            {isLoading ?  <Loader /> :
            <div className="app-content content dashboard">
                <div className="content-wrapper">
                    <div className="content-body dashCard">
                        {/* Basic form layout section start */}
                        <section id="configuration">
                            <div className="row dashboardMain">
                                <div className="col-12">
                                    <div className="py-4 px-5 mb-5">
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
                                                    <button className="nav-link " id="revenue-tab" data-bs-toggle="tab" data-bs-target="#revenue" type="button" role="tab" aria-controls="revenue" aria-selected="false">Revenue</button>
                                                </li>
                                                <li onClick={() => {
                                                    history?.push('/AnalyticsOrder')
                                                }} className="nav-item" role="presentation">
                                                    <button className="nav-link " id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false">Orders</button>
                                                </li>
                                                <li onClick={() => {
                                                    history?.push('/AnalysisProducts')
                                                }} className="nav-item " role="presentation">
                                                    <button className="nav-link " id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="true">Categories</button>
                                                </li>
                                                <li onClick={() => {
                                                history?.push('/AnalyticsVariation')
                                            }} className="nav-item" role="presentation">
                                                    <button className="nav-link" id="variations-tab" data-bs-toggle="tab" data-bs-target="#variations" type="button" role="tab" aria-controls="variations" aria-selected="false">Variations</button>
                                                </li>
                                                <li onClick={() => {
                                                    history?.push('/Taxes')
                                                }} className="nav-item" role="presentation">
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
                                                                <div className="dataTables_wrapper mb-3">
                                                                    <div className="user-listing-top">
                                                                        <div className="row align-items-end d-flex mb-1">
                                                                            <div className="col-xl-12">
                                                                                <div className="row align-items-center">
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
                                                                                    <div className="col-xl-2 col-md-6 col-12">
                                                                                        <label htmlFor className="d-block">Select Category</label>
                                                                                        <select className="w-100 form-control sort-select"
                                                                                            id
                                                                                            value={category}
                                                                                            onChange={(e) => {
                                                                                                settingDataHandler(e.target.value)
                                                                                                // setcategorytitle(JSON.parse(e.target.value?._id))
                                                                                                // setcategory(JSON.parse(e.target.value?.categorytitle))

                                                                                            }}  >
                                                                                            <option value>Select Categories </option>
                                                                                            {allofcategory?.length > 0 && allofcategory?.map(allcat => (
                                                                                                <option value={JSON.stringify(allcat)}>
                                                                                                    {allcat?.categorytitle}
                                                                                                </option>

                                                                                            ))}
                                                                                        </select>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-dashboard p-0 mb-3">
                                                                    <div className="row">
                                                                        <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                            <div className="card">
                                                                                <div className="card-body d-flex align-items-center">
                                                                                    <div className="media w-100">
                                                                                        <div className="media-body text-center">
                                                                                            <div className="card-title">Items Sold</div>
                                                                                            <h3>{categoriesummarydata?.categoryOrders[0]?.topSeller ? categoriesummarydata?.categoryOrders[0]?.topSeller : 0}</h3>
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
                                                                                            <h3>${categoriesummarydata?.categoryOrders[0]?.netSales ? categoriesummarydata?.categoryOrders[0]?.netSales : 0}</h3>
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
                                                                                            <div className="card-title">Orders</div>
                                                                                            <h3>{categoriesummarydata?.totalorders?.length > 0 ? categoriesummarydata?.totalorders?.length : 0}</h3>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="chart-main position-relative mb-5">
                                                                    <div className="row">
                                                                        <div className="col-12 col-xl-12 text-center py-3">
                                                                            <Graph
                                                                                graph_data={categoriesummarydata?.categorygraph}
                                                                                label='Items Sold'
                                                                            />
                                                                            <p className="totalLabel pt-3">{categorytitle}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex align-content-center justify-content-between tckt-srch-row">
                                                                            <h3 className="pageTitle mb-0 text-red">Categories</h3>
                                                                            <div className="d-flex">
                                                                                {/* <form className="serchbarHead me-3">
                                                                                    <input type="email" name placeholder="Search...." />
                                                                                    <button type="button"><i className="fas fa-search" /></button>
                                                                                </form> */}
                                                                                <Link to='#' onClick={printDocument} className="fw-semibold h_20 pe-3 text-primary text-underline">Download</Link>
                                                                                {/* <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row mb-3">
                                                                        <div className="col-12 col-md-12">
                                                                            <div className>
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

                                                                                <div className="main-tabble table-responsive">
                                                                                    <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer px-0">
                                                                                        <div className="row">
                                                                                            <div className="col-sm-12">
                                                                                                <table id="divToPrint"
                                                                                                ref={inputRef} className="table table-borderless dataTable">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Category</th>
                                                                                                            <th>Item Sold</th>
                                                                                                            <th>Net sales</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>

                                                                                                        {topCategoriestemsSolddata?.topCategoiresItemsSoldbyyear?.length > 0 && topCategoriestemsSolddata?.topCategoiresItemsSoldbyyear?.map(dash => (
                                                                                                            <tr>
                                                                                                                <td>{getCatName(dash?._id[0])}</td>
                                                                                                                <td>{dash?.topSeller}</td>
                                                                                                                <td>${dash?.netSales}</td>
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
                                                                                    <h5 className="me-1 fw-semibold">Categories:</h5>
                                                                                    <p>10</p>
                                                                                </div>
                                                                                <div className="d-flex me-5">
                                                                                    <h5 className="me-1 fw-semibold">Item Sold:</h5>
                                                                                    <p>20</p>
                                                                                </div>
                                                                                <div className="d-flex me-5">
                                                                                    <h5 className="me-1 fw-semibold">Net Sales:</h5>
                                                                                    <p>$200</p>
                                                                                </div>
                                                                                <div className="d-flex me-5">
                                                                                    <h5 className="me-1 fw-semibold">Order:</h5>
                                                                                    <p>$23</p>
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

export default AnalysisCategories