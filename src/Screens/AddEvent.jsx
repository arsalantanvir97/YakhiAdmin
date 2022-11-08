import React from 'react'

const AddEvent = () => {
  return (
    <><div>
    <div className="app-content dashboard content">
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
                          <h1>Add New Event</h1>
                        </div>
                      </div>
                    </div>
                    <div className="row addEventsSec">
                      <div className="col-lg-7">
                        <div className="eventImageUpload text-center mb-3">
                          <a href="#"><i className="fas fa-upload" /></a>
                          <h5>Upload Video or Photo</h5>
                          <h6>(Size Should be Max 5MB)</h6>
                        </div>
                        <form>
                          <div className="mb-3">
                            <label>Event Title</label>
                            <input type="text" className="form-control" placeholder="Title ABC" />
                          </div>
                          <div className="mb-3">
                            <label>Event Date</label>
                            <input type="date" className="form-control" placeholder="Title ABC" />
                          </div>
                          <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control" placeholder=" Abc" rows={3} defaultValue={""} />
                          </div>
                          <button type="button" className="btn" data-toggle="modal" data-target="#updateEvent">Add</button>
                        </form>
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
    {/* Add Sub Employee Popup */}
    <div className="modal fade delete-product p-0" id="updateEvent" tabIndex role aria-labelledby aria-hidden="true" data-backdrop="static">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel" />
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-10 mx-auto text-center">
                <img src="images/icon-check.png" alt="" className="img-fluid mb-2" />
                <h6>Event Updated Succesfully</h6>
                <button type="button" className="btn btn-primary mr-1 mt-1 px-0" data-dismiss="modal" aria-label="Close">Ok</button>
                {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default AddEvent