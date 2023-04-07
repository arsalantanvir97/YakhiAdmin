import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import { addTax } from "./Api/Auth/Taxes";
import { useMutation, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";

const AddTax = ({ history }) => {
  const usequeryClient = new useQueryClient();
  const [state, setstate] = useState("");
  const [percent, setpercent] = useState(0);

  const { mutate: addTaxes, isLoading: addTaxLoading } = useMutation((data) => addTax(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Tax Added Successfully');
      usequeryClient.invalidateQueries(['taxes'])

      history.push("/Taxes");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const addTaxHandler = async () => {
    const body = { percent: Number(percent), state }
    addTaxes(body)
    setpercent(0);
    setstate("");
  };

  return (
    <div><div className="app-content content uploadVideoMain">
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
                                                }} /> Add Tax</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">State<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          <select value={state}
                            onChange={(e) => setstate(e.target.value)}
                          >
                            <option value>select</option>
                            <option value={"Alabama"}>Alabama</option>
                            <option value={"Alaska"}>Alaska</option>
                            <option value={"Arizona"}>Arizona</option>
                            <option value={"Arkansas"}>Arkansas</option>
                            <option value={"California"}>California</option>
                            <option value={"Colorado"}>Colorado</option>
                            <option value={"Connecticut"}>Connecticut</option>
                            <option value={"Delaware"}>Delaware</option>
                            <option value={"Florida"}>Florida</option>
                            <option value={"Georgia"}>Georgia</option>
                            <option value={"Hawaii"}>Hawaii</option>
                            <option value={"Idaho"}>Idaho</option>
                            <option value={"IllinoisIndiana"}>IllinoisIndiana</option>
                            <option value={"Iowa"}>Iowa</option>
                            <option value={"Kansas"}>Kansas</option>
                            <option value={"Kentucky"}>Kentucky</option>
                            <option value={"Louisiana"}>Louisiana</option>
                            <option value={"Maine"}>Maine</option>
                            <option value={"Maryland"}>Maryland</option>
                            <option value={"Massachusetts"}>Massachusetts</option>
                            <option value={"Michigan"}>Michigan</option>
                            <option value={"Minnesota"}>Minnesota</option>
                            <option value={"Mississippi"}>Mississippi</option>
                            <option value={"Missouri"}>Missouri</option>
                            <option value={"MontanaNebraska"}>MontanaNebraska</option>
                            <option value={"New Hampshire"}>New Hampshire</option>
                            <option value={"New Jersey"}>New Jersey</option>
                            <option value={"New Mexico"}>New Mexico</option>
                            <option value={"New York"}>New York</option>
                            <option value={"North Carolina"}>North Carolina</option>
                            <option value={"North Dakota"}>North Dakota</option>
                            <option value={"Ohio"}>Ohio</option>
                            <option value={"Oklahoma"}>Oklahoma</option>
                            <option value={"Oregon"}>Oregon</option>
                            <option value={"PennsylvaniaRhode Island"}>
                              PennsylvaniaRhode Island
                            </option>
                            <option value={"South Carolina"}>South Carolina</option>
                            <option value={"South Dakota"}>South Dakota</option>
                            <option value={"Tennessee"}>Tennessee</option>
                            <option value={"Texas"}>Texas</option>
                            <option value={"Utah"}>Utah</option>
                            <option value={"Vermont"}>Vermont</option>
                            <option value={"Virginia"}>Virginia</option>
                            <option value={"Washington"}>Washington</option>
                            <option value={"West Virginia"}>West Virginia</option>
                            <option value={"Wisconsin"}>Wisconsin</option>
                            <option value={"Wyoming"}>Wyoming</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">Tax<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          <InputNumber
                            value={percent}
                            onChange={setpercent}
                            max={12}
                            className="siteInput"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {addTaxLoading ? <i className="fas fa-spinner fa-pulse"></i> :
                        <Link to='#' onClick={() =>
                          percent?.length > 0 && state?.length > 0
                            ? addTaxHandler()
                            : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                        } className="btn_darkbluep">Add</Link>}
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

export default AddTax