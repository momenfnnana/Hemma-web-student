import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { ToastDemo } from "../../../categories/quick-questions/toast-notification";

export class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      training: [],
    isPageLoading: false
  };
}
    componentDidMount = () => {
        this.setState({ isPageLoading: true });
        const courseId = this.props.match.params.id;
        let token = localStorage.getItem("token");
        let headers = {
          Authorization: `Bearer ${token}`
        };
        let url="";
        if(this.props.designType)
        {
        url = new URL(`${apiBaseUrl}/Exams?courseId=${courseId}`);
        }
        else
        {
          url = new URL(`${apiBaseUrl}/Exams/All?courseId=${courseId}`);
        }
        url.searchParams.append("type", "Training");
        axios
          .get(url, { headers })
          .then(response => {
            this.setState({ training: response.data.data, isPageLoading: false });
          })
          .catch(error => {
            this.setState({ isPageLoading: false });
            console.log(error);
          });
      };
    createCourseLink(courseId,traId)
      {
        let baseUrl = process.env.PUBLIC_URL;
        return baseUrl+ `/course/content/${courseId}/exam/training/${traId}`
      }

      renderTraining() {
        const training = this.state.training || [];
        const courseId = this.props.match.params.id;
        return training.map(tra => {
          return (
            <React.Fragment>
              <tr>
                <td scope="row" className="dark-silver-text small">
                  {tra.title}
                </td>
                <td className="en-text dark-silver-text small text-center">
                  {tra.totalQuestions}
                </td>
                <td className="en-text dark-silver-text small text-center">
                  {tra.totalAttempts}
                </td>
                <td>
                  <Link
                    to={`/course/content/${courseId}/exam/training/${tra.id}`}
                    className="badge dark-bg text-white w-100"
                  >
                    تدرب الآن
                  </Link>
                 {/* <ToastDemo copyLink={{ btnName:'مشاركة التدريب',link:this.createCourseLink(courseId,tra.id)}} />*/}
                </td>
              </tr>
            </React.Fragment>
          );
        });
      }
    render() {
        return (
            <>
            {this.state.isPageLoading ? (
                <div
                className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
                style={{ minHeight: 350 }}
              >
                <Loader type="ball-spin-fade-loader" className="dark-loader" />
              </div>
              ) : (
            <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">
                التدريبات
              </h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            {this.state.training == undefined || this.state.training.length == 0 ? (
              <React.Fragment>
                <div
                  className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                  style={{ height: 300 }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/empty-exams.png"
                    }
                    height="80"
                    className="contain-img mb-3"
                  />
                  <p className="dark-silver-text mt-0 mb-0">
                    لا يوجد تدريبات متاحة
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <div className="box-layout shadow-sm">
                <Table className="mb-0 table-responsive">
                  <thead className="silver-bg">
                    <tr>
                      <th className="w-10 dark-silver-text small border-0 ">
                        التدريب
                      </th>
                      <th className="w-15 dark-silver-text small border-0 text-center ">
                        عدد الأسئلة
                      </th>
                      <th className="w-15 dark-silver-text small border-0 text-center ">
                        عدد المحاولات
                      </th>
                      <th className="w-15 dark-silver-text small border-0 text-center ">
                        تحكم
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTraining()}</tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
        </React.Fragment>
        )}
        </>
        )
    }
}