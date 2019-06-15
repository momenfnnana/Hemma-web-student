import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";
import { numberField } from "../../../../shared/inputs/numberField";

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");

export class NewInstallmentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      // Idicates whether the installment value is in edit mode
      editingInstallment: false,
      // Holds the temporary installment value
      tempInstallment: null,
      tooltipOpen: false,
      installmentValdation: false,
      priceValdation: false
    };
    this.onUpdateInstallmentInput = this.onUpdateInstallmentInput.bind(this);
  }

  /**
   * Handle updating the value of the installment input
   */
  onUpdateInstallmentInput(event) {
    const newValue = Number.parseInt(event.target.value);
    this.setState({ tempInstallment: newValue });
    if (newValue > this.state.details.remainingAmount) {
      this.setState({ installmentValdation: true });
    } else {
      this.setState({ installmentValdation: false });
    }
  }
  onSubmit(values) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: "CourseInstallment",
      itemId: this.props.courseId,
      installment: values.installment
    };
    axios
      .post(`${apiBaseUrl}/cart/items`, data, { headers })
      .then(response => {
        this.props.closeInstallmentModal();
        this.props.history.push("/cart");
        swal("تنبيه", "تم اعتماد قيمة القسط بنجاح", "success", {
          button: "متابعة"
        });
      })
      .catch(error => {
        this.props.closeInstallmentModal();
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الدورة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الدورة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الدورة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة"
            });
            break;
        }
      });
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    const courseId = this.props.courseId;
    axios
      .get(`${apiBaseUrl}/content/${courseId}/remaining_payment_details`, {
        headers
      })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        height: "auto",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isInstallmentOpen,
      closeInstallmentModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isInstallmentOpen}
          onRequestClose={closeInstallmentModal}
          closeInstallmentModal={closeInstallmentModal}
        >
          <div className="container h-100 d-flex align-items-center pt-3 pb-3">
            <div className="row">
              <div className="col-12 text-center">
                <h6 className="light-text mb-4 mt-0">طلب سداد جديد</h6>
              </div>

              <div className="col-12 d-flex align-items-center flex-column justify-content-center">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div className="form-group d-flex align-items-center flex-row mb-4">
                    <label className="smaller dark-text mt-0 mb-0 mr-3">
                      القيمة التي تريد دفعها
                    </label>

                    <div>
                      <Field
                        type="number"
                        className="form-control en-text w-100 mt-0 mb-0 text-center"
                        placeholder="200"
                        name="installment"
                        component={numberField}
                        validate={required}
                        onChange={this.onUpdateInstallmentInput}
                      />

                      {this.state.installmentValdation == true ? (
                        <small className="w-100 smaller">
                          القيمة المدخلة أعلى من القيمة المتبقية{" "}
                        </small>
                      ) : null}
                    </div>

                    <label className="small dark-text mt-0 mb-0 ml-3">
                      ريال
                    </label>
                  </div>

                  <div className="box-layout light-silver-bg d-flex align-items-center justify-content-center flex-column w-100 mt-2 mb-4 h-80">
                    <h6 className="dark-text small mb-1 mt-0">
                      القيمة المتبقية:{" "}
                      <span className="light-text en-text">
                        {this.state.details &&
                          this.state.details.remainingAmount}
                      </span>{" "}
                      <span className="light-text"> ريال </span>
                    </h6>
                    <h6 className="dark-text small mb-0">
                      الوقت المتبقي لإتمام الدفعات:{" "}
                      <span className="light-text en-text">
                        {this.state.details && this.state.details.remainingDays}
                      </span>{" "}
                      <span className="light-text"> أيام </span>
                    </h6>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn light-outline-btn w-50 mx-auto"
                      type="submit"
                    >
                      إنشاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.NewInstallment && state.form.NewInstallment.values
  };
}

NewInstallmentComponent = reduxForm({
  form: "NewInstallment"
  // validate
})(NewInstallmentComponent);

NewInstallmentComponent = connect(mapStateToProps)(NewInstallmentComponent);

export const NewInstallment = withRouter(NewInstallmentComponent);
