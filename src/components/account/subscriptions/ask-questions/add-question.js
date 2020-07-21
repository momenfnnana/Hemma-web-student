import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";

export default class AddQuestion extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isِAddQuestionOpen}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.props.toggleModal} className="bg-light">
            <h6 className="dark-text small mb-0 mt-0">اضافة سؤال </h6>
          </ModalHeader>
          <ModalBody>
              <Label>
                  <h6 className="dark-text small mb-0 mt-0">السؤال </h6>
                  </Label>

              <div className="position-relative">
            <textarea
              id="commentInput"
              type="text"
              name="comment"
              onChange={this.handleChange}
              placeholder="الرجاء ادخال السؤال"
              rows="6"
              className="form-control small dark-text shadow-sm mb-3"
              ref={ref => (this.commentInput = ref)}
            />
            <div className="textarea-icon d-flex align-items-center">
              <label htmlFor="uploadImage" className="mb-0">
                <input
                  className="d-none"
                  id="uploadImage"
                  type="file"
                  onChange={this.handleFileChange}
                />
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/picture.png"
                  }
                  height="30"
                  width="30"
                  className="contain-img clickable"
                />
              </label>
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
          <button
                    className="btn dark-outline-btn w-25"
                >اضافة</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
