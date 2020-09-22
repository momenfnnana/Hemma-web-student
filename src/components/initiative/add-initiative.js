import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ConfirmationAddInitiative from "./confirmation-add-initiative";

class AddInitiative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalId: "",
      isConfirmationModelOpen: false,
      disabled: true,
    };
  }

  toggleConfirmationModal = () => {
    this.setState({
      isConfirmationModelOpen: !this.state.isConfirmationModelOpen,
    });
  };
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ nationalId: value, disabled: false });
  };
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isModelOpen}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
          <form>
            <ModalHeader
              toggle={this.props.toggleModal}
              className="bg-light dark-text small mb-0 mt-0"
            >
              <div className="dark-text">
                <h4>الرجاء إدخال رقم الهوية</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <input
                className="w-75 input-model mr-2 en-text pl-3"
                name="nationalId"
                type="text"
                onChange={this.handleChange}
              ></input>
              <div>
                <label className="dark-text small mb-0 mt-0 label-model">
                  تأكد من صحة ادخالك لرقم الهوية
                </label>
              </div>
              <div className="position-relative"></div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mb-5">
                <Button
                  onClick={this.toggleConfirmationModal}
                  className="btn w-50 yellow-btn justify-content-center d-flex light-text align-items-center mt-5"
                  disabled={this.state.disabled}
                >
                  موافق
                </Button>
                <ConfirmationAddInitiative
                  toggleConfirmationModal={this.toggleConfirmationModal}
                  isConfirmationModelOpen={this.state.isConfirmationModelOpen}
                  nationalId={this.state.nationalId}
                  id={this.props.id}
                />
              </div>
            </ModalBody>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddInitiative;
