import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import Slider from "react-slick";

class ImportantQuiestions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isImportantQuiestionsModelOpen}
          toggle={this.props.toggleImportantModal}
          className="modal-dialog-centered"
        >
          <ModalHeader
            toggle={this.props.toggleModal}
            className="bg-light dark-text small mb-0 mt-0"
          >
            <div className="dark-text">
              <h4>أهم التساؤلات</h4>
            </div>
          </ModalHeader>
          <ModalBody>
            <div>
              <Slider {...settings}>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/male-avatar.png"
                    }
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/comments.png"}
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/female-avatar.png"
                    }
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/smiley.png"}
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/smile.png"}
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
              </Slider>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ImportantQuiestions;
