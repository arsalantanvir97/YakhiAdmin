import React from 'react'

const CategoryProducts = () => {
  return (
    <div><div className="app-content dashboard content">
    <div className="content-wrapper">
      <div className="content-body">
        {/* Basic form layout section start */}
        <section id="configuration" className="user-page">
          <div className="row">
            <div className="col-12">
              <div className="card rounded">
                <div className="card-body p-md-2 p-lg-3 p-xl-4">
                  <div className="page-title">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6">
                        <h1>Products</h1>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-6 text-right">
                        <a href="block-users.php" className="btn btn-primary">Add Product</a>
                      </div>
                    </div>
                  </div>
                  <div className="dataTables_wrapper">
                    <div className="user-listing-top">
                      <div className="row d-flex justify-content-end mb-1">
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end">
                          <div className="dataTables_filter">
                            <label>Search:<input type="search" className="form-control form-control-sm" placeholder="Search" /></label>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end d-flex mb-1">
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 d-md-flex d-block align-items-center">
                          <label htmlFor className="d-block">Sort by:</label>
                          <select name className="form-control sort-select" id>
                            <option value>Latest</option>
                            <option value>Earlier</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 d-md-flex d-block justify-content-start justify-content-md-end align-items-center">
                          <label htmlFor className="d-block">Filter by Category</label>
                          <select name className="form-control" id>
                            <option value selected>Category A</option>
                            <option value>Category B</option>
                          </select>
                        </div>
                      </div>
                      <div className="row align-items-end d-flex">
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 d-md-flex d-block align-items-center">
                          <div className=" dataTables_length">
                            <label>Show <select className="form-control form-control-sm">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select> entries</label>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 d-md-flex d-block justify-content-start justify-content-md-end align-items-center">
                          <label htmlFor className="d-block">Filter by Status</label>
                          <select name className="form-control" id>
                            <option value>Filter</option>
                            <option value>user</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row row-table">
                      <div className="main-tabble table-responsive">
                        <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                          <div className="row">
                            <div className="col-sm-12">
                              <table className="table table-striped table-bordered zero-configuration dataTable no-footer">
                                <thead>
                                  <tr>
                                    <th className="sorting_asc">ID</th>
                                    <th className="sorting">SKU</th>
                                    <th className="sorting">Name</th>
                                    <th className="sorting">Category</th>
                                    <th className="sorting">Status</th>
                                    <th className="sorting">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className>01</td>
                                    <td>ABC</td>
                                    <td>ABC</td>
                                    <td>Category A</td>
                                    <td>Active</td>
                                    <td>
                                      <div className="btn-group ml-1">
                                        <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-eye" />View Detail</a>
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-edit" />Edit</a>
                                          <a className="dropdown-item" href="#_" data-toggle="modal" data-target=".delete-product"><i className="fa fa-trash-alt" />Remove</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className>01</td>
                                    <td>ABC</td>
                                    <td>ABC</td>
                                    <td>Category A</td>
                                    <td>Inactive</td>
                                    <td>
                                      <div className="btn-group ml-1">
                                        <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-eye" />View Detail</a>
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-edit" />Edit</a>
                                          <a className="dropdown-item" href="#_" data-toggle="modal" data-target=".delete-product"><i className="fa fa-trash-alt" />Remove</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className>03</td>
                                    <td>ABC</td>
                                    <td>ABC</td>
                                    <td>Category A</td>
                                    <td>Active</td>
                                    <td>
                                      <div className="btn-group ml-1">
                                        <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-eye" />View Detail</a>
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-edit" />Edit</a>
                                          <a className="dropdown-item" href="#_" data-toggle="modal" data-target=".delete-product"><i className="fa fa-trash-alt" />Remove</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className>04</td>
                                    <td>ABC</td>
                                    <td>ABC</td>
                                    <td>Category A</td>
                                    <td>Inactive</td>
                                    <td>
                                      <div className="btn-group ml-1">
                                        <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-eye" />View Detail</a>
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-edit" />Edit</a>
                                          <a className="dropdown-item" href="#_" data-toggle="modal" data-target=".delete-product"><i className="fa fa-trash-alt" />Remove</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className>05</td>
                                    <td>ABC</td>
                                    <td>ABC</td>
                                    <td>Category A</td>
                                    <td>Active</td>
                                    <td>
                                      <div className="btn-group ml-1">
                                        <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-eye" />View Detail</a>
                                          <a className="dropdown-item" href="user-details.php"><i className="fa fa-edit" />Edit</a>
                                          <a className="dropdown-item" href="#_" data-toggle="modal" data-target=".delete-product"><i className="fa fa-trash-alt" />Remove</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 col-md-5">
                              <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                <ul className="pagination">
                                  <li className="paginate_button page-item previous disabled"><a href="#" className="page-link">Previous</a></li>
                                  <li className="paginate_button page-item active"><a href="#" className="page-link">1</a></li>
                                  <li className="paginate_button page-item"><a href="#" className="page-link">2</a></li>
                                  <li className="paginate_button page-item"><a href="#" className="page-link">3</a></li>
                                  <li className="paginate_button page-item"><a href="#" className="page-link">4</a></li>
                                  <li className="paginate_button page-item"><a href="#" className="page-link">5</a></li>
                                  <li className="paginate_button page-item next disabled" i><a href="#" className="page-link">Next</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CategoryProducts