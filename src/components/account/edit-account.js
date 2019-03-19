import React, { Component } from "react";
import { Field, reduxForm, Fields } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
import { inputField } from "../shared/inputs/inputField";
import { editPhoneField } from "../shared/inputs/editPhoneField";
import { withRouter, Link } from "react-router-dom";
import "./styles.sass";
import { FaRegUser } from "react-icons/fa";
import { getProfile } from "../../actions";

const validate = values => {
  const errors = {};
  if (values.username) {
    errors.phone = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

class EditAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="dark-text">الملف الشخصي</h3>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="white-bg box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/profile-img.png"
                    }
                    height="110"
                    className="mb-4"
                  />
                  <form className="w-25">
                    <Field
                      name="name"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="الاسم الكامل"
                    >
                      <FaRegUser />
                    </Field>
                    <Field
                      fieldName="phoneNumber"
                      name="phoneNumber"
                      // names={["phoneNumber", "countryCode"]}
                      component={editPhoneField}
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      defaultCountry="sa"
                      disabled={true}
                    />
                    <Link
                      to="/account/reset-password"
                      className="light-text smaller"
                    >
                      تعديل كلمة المرور
                    </Link>
                    <button
                      type="submit"
                      className="btn dark-outline-btn w-100 mt-3"
                    >
                      حفظ التعديلات{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile,
    entireState: state
  };
}

EditAccountComponent = reduxForm({
  form: "EditAccount",
  enableReinitialize: true,
  validate
})(EditAccountComponent);

EditAccountComponent = connect(
  mapStateToProps,
  { getProfile }
)(EditAccountComponent);

export const EditAccount = withRouter(EditAccountComponent);
