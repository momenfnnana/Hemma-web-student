import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import swal from "@sweetalert/with-react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "../styles.sass";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import Loader from "react-loaders";
import { Api } from "../../../../api";

export class BookletsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklets: [],
      booklet: {},
      isPageLoading: false,
      showOrderBooklet:true
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  componentDidMount() {
    this.setState({ isPageLoading: true });
    if (this.props.authenticated) {
      this.props.getUser();
    }
    const courseId = this.props.match.params.id;
const bookletId = this.props.m
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/booklet`, { headers })
      .then((response) => {

        this.setState({
          booklets: response.data.data.parts,
          isPageLoading: false,
          booklet: response.data.data,
        });
        axios
        .get(`${apiBaseUrl}/cart_v2/Check_Booklet_Exist/${this.state.booklet.id}`, { headers })
        .then((response) => {
          this.setState({
            showOrderBooklet: !response.data.data,
          });
        })
        .catch((error) => {
         // this.setState({ isPageLoading: false });
          console.log(error);
        });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
 
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  onSubmit(type) {
    Api.cart
      .addBooklet(this.state.booklet.id, type)
      .then((response) => {
        this.props.history.push("/cart");
      })
      .catch((error) => {
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الملزمة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة",
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الملزمة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة",
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الملزمة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة",
            });
            break;
          case "ItemAlreadyAdded":
            this.props.history.push("/cart");
            break;

          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة",
            });
            break;
        }
      });
  }
  confirmationPopup(type) {
    swal(
        `لا يمكن الانسحاب من الدورة بعد طلب الملزمة`,
        {
          buttons: {
            ok: "موافق",
          },
        }
    ).then((value) => {
      switch (value) {
        case "ok":
          this.onSubmit(type)
        default:
          break;
      }
    });
  }




  renderBooklets() {
    const booklets = this.state.booklets;
    const courseId = this.props.match.params.id;

    return booklets.map((booklet) => {
      return (
        <div
          to={`/course/content/${courseId}/booklets/${booklet.id}`}
          onClick={() =>
            this.props.history.push(
              `/course/content/${courseId}/booklets/${booklet.id}`,
              {
                name: booklet.name,
                url: booklet.url,
              }
            )
          }
          className="col-md-4"
          key={booklet.id}
        >
          <div className="card card-sm custom-height shadow-sm border-0 clickable">
            <header className="card-thumb d-flex align-items-center justify-content-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/pdf.png"}
                alt="File"
                className="contain-img custom-img mx-auto"
              />
            </header>
            <div className="card-body d-flex justify-content-start align-items-center">
              <h6 className="card-title small mb-0 p-0 dark-text">
                {booklet.name}
              </h6>
            </div>
          </div>
        </div>
      );
    });
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
              <div className="col-12 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="dark-text mb-0 mt-0"></h6>

                  <div>
                    {/* {this.state.booklet.agency == "Printsa" ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`https://www.aramex.com/sa/ar/track/track-shipments/track-results?mode=0&ShipmentNumber=${this.state.booklet.trackingId}`}
                        target="_blank"
                      >
                        تتبع
                      </a>
                    ) : this.state.booklet.agency == "SMSA" ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`http://www.smsaexpress.com/Track.aspx?tracknumbers=${this.state.booklet.trackingId}`}
                        target="_blank"
                      >
                        تتبع
                      </a>
                    ) : null} */}
{this.state.showOrderBooklet ?(
   <React.Fragment>
     {this.state.booklet &&
      this.state.booklet.canBePurchased &&
      this.state.booklet.availableInPrint ? (
        <>
          {this.state.booklet.availableInColor && (
            <button
              type="submit"
              className="btn blue-border-btn mr-1"
              onClick={() => this.confirmationPopup('Colored')}
            >
              طلب الملزمة الملونة مطبوعة
            </button>
          )}
          {this.state.booklet.availableInBlackAndWhite && (
            <button
              type="submit"
              className="btn blue-border-btn"
              onClick={() => this.confirmationPopup('BlackAndWhite')}
            >
              طلب الملزمة الأبيض و الأسود مطبوعة
            </button>
          )}
        </>
      ) : null}
      </React.Fragment>
): null}
                  
                  </div>
                </div>
              </div>
              <div className="box-layout silver-bg shadow-sm d-flex flex-column w-100 rounded p-4 pb-0">
                {this.state.booklets == undefined ||
                this.state.booklets.length == 0 ? (
                  <React.Fragment>
                    <div className="col-12">
                      <div
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{ height: 200 }}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/empty-files.png"
                          }
                          className="mb-1"
                          height="80"
                        />
                        <h5 className="dark-text mt-0">لا يوجد ملازم متاحة</h5>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="row">{this.renderBooklets()}</div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user,
  };
}

BookletsComponent = connect(mapStateToProps, { getUser })(BookletsComponent);

export const Booklets = withRouter(BookletsComponent);
