import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

class ConfirmationAddInitiative extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          backdrop="true"
          isOpen={this.props.isConfirmationModelOpen}
          toggle={this.props.toggleConfirmationModal}
          className="modal-dialog-centered"
        >
          <form>
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
                  <Button className="btn w-100 yellow-btn justify-content-center d-flex light-text align-items-center mt-5">
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
