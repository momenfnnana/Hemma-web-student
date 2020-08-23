import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";

class ConfirmationAddInitiative extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const nationalId = this.props.nationalId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(`${apiBaseUrl}/auth/nationalId?nationalId=${nationalId}`, null, {
        headers,
      })
      .then(() => {
        axios.post(
          `${apiBaseUrl}/InitiativeFreeLectures?id=${this.props.id}`,
          null,
          {
            headers,
          }
        );
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isConfirmationModelOpen}
          toggle={this.props.toggleConfirmationModal}
          className="modal-dialog-centered"
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader
              toggle={this.props.toggleConfirmationModal}
              className="bg-light dark-text small mb-0 mt-0"
            >
              <div className="dark-text mt-5">
                <h4>هل أنت متأكد من صحة الرقم المدخل؟</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="position-relative"></div>
              <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mb-5">
                  <Button
                    className="btn w-100 yellow-btn justify-content-center d-flex light-text align-items-center mt-5"
                    type="submit"
                  >
                    متأكد
                  </Button>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mb-5">
                  <Button className="btn w-100 yellow-btn justify-content-center d-flex light-text align-items-center mt-5">
                    تراجع
                  </Button>
                </div>
              </div>
            </ModalBody>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmationAddInitiative;
