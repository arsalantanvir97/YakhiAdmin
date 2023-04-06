import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import InputNumber from "../components/InputNumber";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import Toasty from "../utils/toast";
import { editPromoCode, getPromoCOdeDetails } from "./Api/PromoCodes";
import DatePicker from "react-datepicker";

const PromoCodeEdit = ({ match, history }) => {
    const [title, settitle] = useState("");
    const [startingdate, setstartingdate] = useState("");
    const [endingdate, setendingdate] = useState("");
    const [promocode, setpromocode] = useState("");
    const [discount, setdiscount] = useState("");
    const [minorderamount, setminorderamount] = useState("");
    const [status, setstatus] = useState("");

    const usequeryClient = new useQueryClient();
    const { isLoading, data: promdata } = useQuery(
        {
            queryKey: ["promocode", match.params.id],
            queryFn: () =>
                getPromoCOdeDetails(match.params.id),

        }
    );
    useEffect(() => {
        settitle(promdata?.data?.promocode?.title);
        setstartingdate(new Date(promdata?.data?.promocode?.startingdate));
        setendingdate(new Date(promdata?.data?.promocode?.endingdate));
        setpromocode(promdata?.data?.promocode?.promocode);
        setdiscount(promdata?.data?.promocode?.discount);
        setminorderamount(promdata?.data?.promocode?.minorderamount);

        setstatus(promdata?.data?.promocode?.status);
    }, [promdata])

    const { mutate, status: promostatus } = useMutation((data) => editPromoCode(data), {
        retry: false,
        onSuccess: (res) => {
            SwalAlert('success', 'SUCCESS', 'PromoCode Edited Successfully');
            usequeryClient.invalidateQueries(['promocodes'])
            usequeryClient.invalidateQueries(['promocode',match.params.id])

            history.push("/PromoCode");
        },
        onError: (err) => Error(err?.response?.data?.message),
    });


    const submitHandler = async () => {
        console.log("await");
        const body = { title, startingdate, endingdate, promocode, discount, minorderamount, status, id: match.params.id }
        mutate(body)
    };
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
                                                <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                                                    history.goBack()
                                                }} /> Edit Promo</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Promo Code<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <InputNumber
                                                        value={promocode}
                                                        onChange={setpromocode}
                                                        max={9}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Amount Or Percent<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <InputNumber
                                                        value={discount}
                                                        onChange={setdiscount}
                                                        max={9}
                                                        className="form-control"
                                                    />                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Min Order Amount* $<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <InputNumber
                                                        value={minorderamount}
                                                        onChange={setminorderamount}
                                                        max={9}
                                                        className="form-control"
                                                    />                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Starting Date<span className="text-danger">*</span></label>
                                                <div className="position-relative">

                                                    {title&&
                                                    <DatePicker
                                                        minDate={new Date()}
                                                        selected={startingdate}

                                                        onChange={(startingdate) =>
                                                            setstartingdate(startingdate)
                                                        }
                                                        className="siteInput"
                                                    />     }                         
                                                                          {/* <textarea placeholder="Enter Video Description" class="pt-2"></textarea> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Status<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <select value={status}
                                                        onChange={(e) => {
                                                            setstatus(e.target.value);

                                                        }}>
                                                        <option value={true} >
                                                            Active
                                                        </option>
                                                        <option value={false}>Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-field">
                                                <label htmlFor className="siteLabel ps-4 mb-2">Promo Desc<span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="text" className="siteInput" value={title}
                                                        onChange={(e) => {
                                                            settitle(e.target.value);
                                                        }} name id />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">

                                            <Link to='#' className="btn_darkbluep" onClick={() => {
                                                promocode > 0 &&
                                                    discount > 0 &&
                                                    title?.length > 0
                                                    ? submitHandler()
                                                    : Toasty(
                                                        "error",
                                                        `Please fill out all the required fields!`
                                                    );
                                            }} >Edit </Link>

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

export default PromoCodeEdit