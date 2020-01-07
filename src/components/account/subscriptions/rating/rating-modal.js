import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-modal";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-beat.scss";

const validate = values => {
  const errors = {};
  if (!values.feedback) {
    errors.feedback = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

class RatingModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      loading: false,
      disabled: false
    };
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      courseId: this.props.courseId,
      score: this.state.rating,
      feedBack: values.feedback
    };
    this.setState({ loading: true, disabled: true });
    axios
      .post(`${apiBaseUrl}/ratings/rate`, data, {
        headers
      })
      .then(response => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRatingModal();
      })
      .catch(error => {
        this.setState({ loading: false, disabled: false });
        console.log(error);
      });
  };

  skipRating = () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      courseId: this.props.courseId
    };
    this.setState({ loading: true, disabled: true });
    axios
      .post(`${apiBaseUrl}/ratings/skip`, data, {
        headers
      })
      .then(response => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRatingModal();
      })
      .catch(error => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRatingModal();
      });
  };

  render() {
    const { isRatingModalOpen, closeRatingModal, handleSubmit } = this.props;
    const { rating } = this.state;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        height: "auto",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
        zIndex: 20
      }
    };
    return (
      <Modal
        style={customStyles}
        ariaHideApp={false}
        isOpen={isRatingModalOpen}
        onRequestClose={this.skipRating}
        closeRatingModal={closeRatingModal}
      >
        <div className="container pt-2 pb-2">
          <div className="row">
            <div className="col-12 text-center">
              <h6 className="dark-text">تقييم الدورة </h6>
            </div>
          </div>
          <form onSubmit={handleSubmit(this.myFormHandler)}>
            <div className="row">
              <div className="col-12 text-center">
                <p className="dark-text light-font-text small mb-0">
                  كم تقييم الدورة من 5؟ (التقييم سري)
                </p>
                <StarRatingComponent
                  starCount={5}
                  value={rating}
                  starColor={"#ffe552"}
                  emptyStarColor={"#a9acb4"}
                  name="rate"
                  onStarClick={this.onStarClick.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="small dark-text">شاركنا رأيك</label>
                  <Field
                    className="form-control light-font-text small"
                    type="text"
                    name="feedback"
                    rows="4"
                    component={textareaField}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn light-outline-btn smaller unset-height w-35"
                  disabled={this.state.disabled}
                >
                  {this.state.loading == true ? (
                    <Loader type="ball-beat" className="light-loader" />
                  ) : (
                    "أرسل التقييم"
                  )}
                </button>
                <button
                  type="button"
                  className="btn dark-outline-btn smaller ml-3 unset-height w-35"
                  onClick={this.skipRating}
                  disabled={this.state.disabled}
                >
                  {this.state.loading == true ? (
                    <Loader type="ball-beat" className="dark-loader" />
                  ) : (
                    "قيّم لاحقاً"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.rating && state.form.rating.values
  };
}

RatingModalComponent = reduxForm({
  form: "rating",
  validate
})(RatingModalComponent);

RatingModalComponent = connect(mapStateToProps)(RatingModalComponent);

export const RatingModal = withRouter(RatingModalComponent);
