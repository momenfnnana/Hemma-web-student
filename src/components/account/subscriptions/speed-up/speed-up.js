import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SpeedUpModal } from "./speedUpModal";
import ReactPlayer from "react-player";
import "../styles.sass";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";

export class SpeedUp extends Component {
  state = {
    isSpeedUpOpen: false,
    files: [],
    selectedFileId: null,
    isPageLoading: false
  };

  openSpeedUpModal(id) {
    this.setState({ isSpeedUpOpen: true, selectedFileId: id });
  }
  closeSpeedUpModal = () => {
    this.setState({ isSpeedUpOpen: false });
  };

  componentDidMount() {
    this.setState({ isPageLoading: true });
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/speedups`, { headers })
      .then(response => {
        this.setState({ files: response.data.data, isPageLoading: false });
      })
      .catch(error => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
  }

  renderFiles() {
    const files = this.state.files || [];
    return files.map(file => (
      <React.Fragment>
        <div className="col-md-4" key={file.id}>
          <div
            className="card card-sm custom-height shadow-sm border-0 clickable"
            onClick={() => this.openSpeedUpModal(file.id)}
          >
            <header className="card-thumb d-flex align-items-center justify-content-center">
              {file.type == "Image" ? (
                <img src={file.url} alt="File" className="cover-img mx-auto w-100" />
              ) : file.type == "Pdf" ? (
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/pdf.png"}
                  alt="File"
                  className="contain-img custom-img mx-auto w-100"
                />
              ) : file.type == "Video" ? (
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/video.png"}
                  alt="File"
                  className="contain-img custom-img mx-auto w-100"
                />
              ) : (
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/file-outline.png"
                  }
                  alt="File"
                  className="contain-img custom-img mx-auto w-100"
                />
              )}
            </header>
            <div className="card-body d-flex justify-content-start align-items-center">
              <h6 className="card-title small mb-0 p-0 dark-text">
                {file.title}
              </h6>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    return (
      <>
      {this.state.isPageLoading ? (
        <div
        className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: 350 }}
      >
        <Loader type="ball-spin-fade-loader" className="dark-loader" />
      </div>
      ) : (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">???????????? ????????????</h6>
            </div>
          </div>
          <div className="col-12">
            {this.state.files == undefined || this.state.files.length == 0 ? (
              <React.Fragment>
                <div
                  className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center"
                  style={{ height: 300 }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/empty-files.png"
                    }
                    height="100"
                    className="contain-img mb-3 w-100"
                  />
                  <p className="dark-text mt-0 mb-0">???? ???????? ???????? ?????????? </p>
                </div>
              </React.Fragment>
            ) : (
              <div className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4">
                <div className="row mb-4">{this.renderFiles()}</div>
              </div>
            )}
          </div>
        </div>
        <SpeedUpModal
          isSpeedUpOpen={this.state.isSpeedUpOpen}
          closeSpeedUpModal={this.closeSpeedUpModal}
          id={this.state.selectedFileId}
        />
      </React.Fragment>
      )}
      </>
    );
  }
}
