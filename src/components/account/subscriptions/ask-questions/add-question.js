import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "reactstrap";
import Axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ question: value });
  };

  handleSubmit(event) {
    // const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      type: "Text",
      content: this.state.question,
    };
    Axios.post(
      `${apiBaseUrl}/AskQuestions?courseId=4a54634e-907f-4236-8382-b803b3fd7363`,
      data,
      {
        headers,
      }
    )
      .then(() => {
        // this.props.history.push(
        //   `/course/content/${courseId}/askQuestions/list`
        // );
        console.log("question added");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isِAddQuestionOpen}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.props.toggleModal} className="bg-light">
              <h6 className="dark-text small mb-0 mt-0">اضافة سؤال </h6>
            </ModalHeader>
            <ModalBody>
              <Label>
                <h6 className="dark-text small mb-0 mt-0">السؤال </h6>
              </Label>

              <div className="position-relative">
                <textarea
                  id="content"
                  type="text"
                  name="content"
                  onChange={this.handleChange}
                  placeholder="الرجاء ادخال السؤال"
                  rows="6"
                  className="form-control small dark-text shadow-sm mb-3"
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
                        process.env.PUBLIC_URL + "/assets/images/picture.png"
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
              <button className="btn dark-outline-btn w-25" type="submit">
                اضافة
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}
