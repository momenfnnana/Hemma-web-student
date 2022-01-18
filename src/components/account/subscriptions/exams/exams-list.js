import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { ToastDemo } from "../../../categories/quick-questions/toast-notification";
// import { setDeisgnType } from "../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export class ExamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    exams: [],
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
   if(this.props.designType)
   {
    axios
    .get(`${apiBaseUrl}/Exams?courseId=${courseId}`, { headers })
    .then(response => {
      this.setState({ exams: response.data.data, isPageLoading: false });
    })
    .catch(error => {
      this.setState({ isPageLoading: false });
      console.log(error);
    });

   }
   else
   {
    axios
    .get(`${apiBaseUrl}/Exams/All?courseId=${courseId}`, { headers })
    .then(response => {
      this.setState({ exams: response.data.data, isPageLoading: false });
    })
    .catch(error => {
      this.setState({ isPageLoading: false });
      console.log(error);
    });
   }
  };
    
createCourseLink(courseId,examid)
{
  let baseUrl = process.env.PUBLIC_URL;
  return baseUrl+ `/course/content/${courseId}/exam/${examid}`
}
  renderExams() {
    const exams = this.state.exams || [];
    const courseId = this.props.match.params.id;

    return exams.map(exam => {
      const examTime = exam.totalTime;
      const totalTime = Number(examTime);

      var h = Math.floor(totalTime / 3600);
      var m = Math.floor((totalTime % 3600) / 60);
      var s = Math.floor((totalTime % 3600) % 60);
      var time =
        ("0" + h).slice(-2) +
        ":" +
        ("0" + m).slice(-2) +
        ":" +
        ("0" + s).slice(-2);

      return (
        <React.Fragment>
          <tr>
            <td scope="row" className="dark-silver-text small">
              {exam.title}
            </td>
            <td className="dark-silver-text small text-center">
              <span className="en-text">{time}</span>
            </td>
            <td className="en-text dark-silver-text small text-center">
              {exam.totalQuestions}
            </td>
            <td className="en-text dark-silver-text small text-center">
              {exam.totalAttempts}
            </td>
            <td className="en-text dark-silver-text small text-center px-1">
              <div className="dark-bg text-white w-100 rounded">
                <Link to={`/course/content/${courseId}/exam/${exam.id}`} className="text-white">
                  اختبر الآن
                </Link>
                {/* <ToastDemo copyLink={{ btnName:'مشاركة الاختبار',link:this.createCourseLink(courseId,exam.id)}} />*/}
              </div>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  }

  render() {
    const courseId = this.props.match.params.id;
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
                الاختبارات الإلكترونية
              </h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            {this.state.exams == undefined || this.state.exams.length == 0 ? (
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
                    لا يوجد اختبارات متاحة
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <div className="box-layout shadow-sm">
                <Table className="mb-0 table-responsive d-table">
                  <thead className="silver-bg">
                    <tr>
                      <th className="w-40 px-1 dark-silver-text small border-0  white-space-pre">
                        الامتحان
                      </th>
                      <th className="w-15 px-1 dark-silver-text small border-0 text-center white-space-pre">
                        مدة الامتحان
                      </th>
                      <th className="w-15 px-1 dark-silver-text small border-0 text-center white-space-pre">
                        عدد الأسئلة
                      </th>
                      <th className="w-15 px-1 dark-silver-text small border-0 text-center white-space-pre">
                        عدد المحاولات
                      </th>
                      <th className="w-15 px-4 dark-silver-text small border-0 text-center white-space-pre">
                        تحكم
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.renderExams()}</tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
      )}
      </>
    );
  }

}
function mapStateToProps(state) {
  return {
    user: state.user,
    designType: state.user?.designType,
  };
}
ExamsList = connect(
  mapStateToProps,
 
)(ExamsList);
export default withRouter(ExamsList);