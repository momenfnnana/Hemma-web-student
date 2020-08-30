import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import axios from "axios";
import swal from "@sweetalert/with-react";
class PreparingComponent extends Component {
  componentDidMount() {
    const InitiativeFreeLecturesId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(
        `${apiBaseUrl}/InitiativeFreeLectures/${InitiativeFreeLecturesId}/preparing`,
        null,
        {
          headers,
        }
      )
      .then(() => {
        swal("مبروك", "لقد تم تحضير الشهادة بنجاح", "success", {
          button: "متابعة",
        });
      })
      .catch((error) => {
        switch (error.response && error.response.data.message) {
          case "Student is already prepared":
            swal("عفواً", "لقد قمت بتحضير الشهادة من قبل", "error", {
              button: "متابعة",
            });
            break;
          case "Student isn't registered in the initiative free lecture":
            swal("عفواً", "الطالب غير مسجل في المحاضرة", "error", {
              button: "متابعة",
            });
            break;
          case "FreeLecture the attendanceLastTime is required you need to set up the Time":
            swal("عفواً", "لم يتم اعداد اخر وقت للتحضير", "error", {
              button: "متابعة",
            });
            break;
          case "You can't preparing the certificate since you exceeding the attendanceLastTime":
            swal(
              "عفواً",
              "لقد تجاوزت الفترة المحددة لاخر وقت لتحضير الشهادة",
              "error",
              {
                button: "متابعة",
              }
            );
            break;
          default:
            this.setState({ errorAlert: true });
        }
      });
  }
  render() {
    return (
      <React.Fragment>
        <section className="mb-3">
          <div className="container px-5">
            <div className="row">
              <div className="col-12 mt-5 mb-5 d-flex flex-column align-items-center justify-content-center">
                <h5 className="dark-text">
                  لرؤية الشهادة يرجى الذهاب الى قائمة الشهادات
                </h5>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const Preparing = withRouter(PreparingComponent);
