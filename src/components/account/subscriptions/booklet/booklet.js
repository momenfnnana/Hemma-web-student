import React, { Component } from "react";
import { Tooltip, Button } from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import swal from "@sweetalert/with-react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../styles.sass";

export class BookletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      tooltipOpen: false,
      booklet: []
    };
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
    }
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/booklet`, { headers })
      .then(response => {
        this.setState({ booklet: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  onSubmit() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: "Booklet",
      itemId: this.state.booklet && this.state.booklet.id
    };
    axios
      .post(`${apiBaseUrl}/cart/items`, data, { headers })
      .then(response => {
        this.props.history.push("/cart");
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الملزمة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الملزمة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الملزمة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة"
            });
            break;
        }
      });
  }

  changePageNumber(event) {
    this.setState({
      pageNumber: event.target.value
    });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const user = this.props && this.props.user;
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">
                {this.state.booklet && this.state.booklet.nameAr}
              </h6>

              <div>
                {this.state.booklet &&
                  this.state.booklet.canBePurchased &&
                  this.state.booklet.availableInPrint && (
                    <button
                      type="submit"
                      className="btn blue-border-btn"
                      onClick={this.onSubmit}
                    >
                      طلب الملزمة مطبوعة
                    </button>
                  )}
              </div>
            </div>
          </div>
          <div className="col-12">
            <embed
              src={this.state.booklet.url}
              type="application/pdf"
              width="100%"
              height="1000"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

BookletComponent = connect(
  mapStateToProps,
  { getUser }
)(BookletComponent);

export const Booklet = withRouter(BookletComponent);
