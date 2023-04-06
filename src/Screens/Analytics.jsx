import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import Graph from '../components/Graph';
import Loader from '../components/Loader';
import { getRevenueSales, handleGetOverviewdata } from './Anayltics';
import { getCategories } from './Api/Categories';

const Analytics = ({ history }) => {
  const [year, setyear] = useState("2023");
  const [year2, setyear2] = useState("2023");
  const [year3, setyear3] = useState("2023");

  const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
    getCategories()
  );

  const { isLoading:overviewloading, data: overview } = useQuery(["overview", year, year2, year3
  ], () =>
    handleGetOverviewdata(year, year2, year3
    ),
    console.log('abc',)
  );


  const getCatName = (id) => {
    let data = allofcategory?.find(o => o?._id == id);
    return data?.categorytitle
  }
  return (
    <div>
    {overviewloading ?  <Loader/> :
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
                        <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button onClick={() => {
                          history?.push('/Revenue')
                        }} className="nav-link" id="revenue-tab" data-bs-toggle="tab" data-bs-target="#revenue" type="button" role="tab" aria-controls="revenue" aria-selected="false">Revenue</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button onClick={() => {
                          history?.push('/AnalyticsOrder')
                        }} className="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false">Orders</button>
                      </li>
                      <li onClick={() => {
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
                            <div className="col-xl-2 col-md-6 col-12">
                              <label htmlFor className="d-block">Select Year</label>
                              <select className="w-100 form-control sort-select"
                                name
                                id
                                value={year}
                                onChange={(e) => {
                                  setyear(e.target.value);
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
                            <div className>
                              <div className="chart-main position-relative">
                                <div className="row">
                                  <div className="col-12 col-xl-12 text-center py-3">
                                    <Graph
                                      graph_data={overview?.overallprodgraph}
                                      label='Items Sold'
                                    />                                    </div>
                                </div>
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
    </div>}
    </div>

  )
}

export default Analytics