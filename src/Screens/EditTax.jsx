import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { closeModals } from "../utils/closeModals";
import { addTax, deleteTax, editTax, getTaxDetails, getTaxes } from "./Api/Auth/Taxes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";

const EditTax = ({ match, history }) => {
    const usequeryClient = new useQueryClient();

    const [state, setstate] = useState("");
    const [percent, setpercent] = useState(0);

    const [taxid, settaxid] = useState();
    const { isLoading, data: taxData } = useQuery(
        {
            queryKey: ["tax", match.params.id],
            queryFn: () =>
                getTaxDetails(match.params.id),

        }
    );

    useEffect(() => {
        setpercent(taxData?.data?.tax?.percent);
        setstate(taxData?.data?.tax?.state);
    }, [taxData])




    const { mutate: editTaxes, isLoading: editTaxLoading } = useMutation((data) => editTax(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'Tax Edited Successfully');
            usequeryClient.invalidateQueries(['taxes',])
            usequeryClient.invalidateQueries(['tax', match.params.id])
            history?.push('/Taxes')
        },
        onError: (err) => Error(err?.response?.data?.message),
    });
    const editTaxHandler = async () => {
        const body = { percent: Number(percent), state, taxid: match.params.id }
        editTaxes(body)
        // setpercent(0);
        // setstate("");
        closeModals();
    }

    return (
        <div>
                              {isLoading ? <Loader /> :
<div className="app-content content uploadVideoMain">
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
                                                <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onclick="javascript:history.go(-1)" /> Edit Tax</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">State<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <p>{state}</p>

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
                                            {editTaxLoading ? <i className="fas fa-spinner fa-pulse"></i>
                                                :
                                                <Link to='#' onClick={() =>
                                                    percent?.length > 0 && state?.length > 0
                                                        ? editTaxHandler()
                                                        : Toasty(
                                                            "error",
                                                            `Please fill out all the required fields!`
                                                        )
                                                } className="btn_darkbluep">Update</Link>}
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

export default EditTax