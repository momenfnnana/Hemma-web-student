import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { ToastDemo } from "../../../categories/quick-questions/toast-notification";

export class HeaderComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row pl-4">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="title-circle">
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/assets/images/questionMark.png"
                                }
                            />
                        </div>
                        <div className={"ar-text title-groups mb-0 ml-0" + " light-bg"}>
                            <h5 className=" mb-0 pl-5">الأسئلة السريعة</h5>
                        </div>

                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <ToastDemo />
                        {/* TODO */}
                        {/* <Link
                            to={`/categories/details/${params.slug}/quick-questions/${this.state.details.categoryGroupId}`}
                            to="/"
                            className="btn btn-sm unset-height small light-btn light-font-text"
                        >
                            العودة إلى المجموعة
                        </Link> */}
                        <Link
                            to="/"
                            className="btn btn-sm unset-height small red-outline-btn light-font-text ml-2"
                        >
                            العودة إلى الرئيسية
                        </Link>
                    </div>
                </div>
                <div className="row pl-4">
                    <div className="col-md-12 ">
                        <p className="dark-text mt-2 w-40 small text-break">
                            لا تفوت فرصة الاشتراك بأحدث دوراتنا التي تؤهلك لاجتياز امتحان
                            القدرات والتحصيلي بأعلى العلامات!
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


