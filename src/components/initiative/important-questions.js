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
                    src={process.env.PUBLIC_URL + "/assets/images/1.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img"
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/2.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/3.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/4.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/5.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/6.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/7.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/8.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/9.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/10.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/11.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/12.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
                    alt="artwork"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/13.jpg"}
                    width="100%"
                    height="100%"
                    className="contain-img "
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
