import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { withRouter } from "react-router-dom";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      file: "",
      questionType: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ question: value });
  };

  handleFileChange = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = new FormData();

    data.append("file", event.target.files[0]);
    console.log(data);
    axios
      .post(`${apiBaseUrl}/AskQuestions/Uploads`, data, {
        headers,
      })
      .then((response) => {
        this.setState({ file: response.data.data.url, questionType: "Image" });
        if (this.state.file) {
          const courseId = this.props.match.params.id;
          let token = localStorage.getItem("token");
          let headers = {
            Authorization: `Bearer ${token}`,
          };
          let data = {
            type: "Image",
            content: this.state.file,
          };
          axios
            .post(`${apiBaseUrl}/AskQuestions?courseId=${courseId}`, data, {
              headers,
            })
            .then((response) => {
              this.props.toggleModal();
              this.props.updateQuestions(response.data.data);
            })
            .catch((error) => {
              this.setState({ disabled: false });
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      type: "Text",
      content: this.state.question,
    };
    axios
      .post(`${apiBaseUrl}/AskQuestions?courseId=${courseId}`, data, {
        headers,
      })
      .then((response) => {
        this.props.toggleModal();
        this.props.updateQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isAddQuestionOpen}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader
              toggle={this.props.toggleModal}
              className="bg-light dark-text small mb-0 mt-0"
            >
              اضافة سؤال
            </ModalHeader>
            <ModalBody>
              <label className="dark-text small mb-0 mt-0">السؤال</label>

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
                      alt="comment"
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

export default withRouter(AddQuestion);
