import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import { MdClose } from "react-icons/md";
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cart: [],
      isInputDisabled: true
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get("https://api.staging.hemma.sa/api/v1/cart", { headers })
      .then(response => {
        this.setState({ cart: response.data.data });
        this.setState({ items: response.data.data.items });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderItems() {
    const items = this.state.items;
    return items.map(item => (
      <React.Fragment>
        <div
          className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 mt-3"
          key={item.itemId}
        >
          <div className="media w-75">
            {/* <MdClose color="#dbdbdb" className="close-btn" /> */}
            <img
              className="mr-3 rounded cover-img"
              src={item.imageUrl}
              height="100"
              width="100"
            />
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">{item.nameAr}</h6>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label smaller dark-silver-text">
                  أرغب في الحصول على ملزمة مطبوعة
                </label>
              </div>
            </div>
          </div>
          <div>
            <form className="form-inline mb-3">
              <div className="form-group">
                <label className="dark-text smaller">قيمة القسط</label>
                <input
                  disabled={this.state.isInputDisabled}
                  type="text"
                  className="form-control form-control-sm mx-sm-3 unset-height text-center"
                  value={item.price}
                />
              </div>
            </form>
            <div className="d-flex flex-row justify-content-between">
              <label className="dark-text smaller mb-0">سعر الاشتراك</label>
              <div className="d-flex flex-column mx-auto">
                <h6 className="light-text text-center mb-0">
                  <span className="en-text">{item.price}</span> ريال
                </h6>
                {item.discountedPrice ? (
                  <h6 className="light-text text-center mb-0 dark-silver-text line-through-text">
                    <span className="en-text">{item.discountedPrice}</span> ريال
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <section className="cart-section">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12">
                <h3 className="dark-text">سلة الشراء</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="silver-bg box-layout w-100 mt-3">
                  <div className="pb-0 p-4 ">
                    <h6 className="dark-text small">السعر الكلي</h6>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <h4 className="light-text mt-2">
                        <span className="en-text">{this.state.cart.total}</span>
                        ريال
                      </h4>

                      <h4 className="dark-silver-text mt-2 mx-auto line-through-text">
                        <span className="en-text">
                          {this.state.cart.totalAfterDiscount}
                        </span>
                        ريال
                      </h4>
                    </div>

                    <h6 className="dark-silver-text smaller mt-2">
                      ملاحظة: السعر شامل الضريبة
                    </h6>
                  </div>
                  <hr />
                  <div className="pl-4 pr-4 pb-3 pt-2">
                    <form>
                      <h6 className="dark-text mb-3">لديك كوبون؟</h6>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control small ltr-input br-left-0"
                          placeholder="أدخل الرمز"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn text-white light-bg small light-font-text"
                            type="button"
                          >
                            تفعيل
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <button className="btn light-outline-btn mt-4 w-100">
                  متابعة
                </button>
              </div>
              <div className="col-md-8 mt-3">
                <h6 className="dark-text">قائمة الدورات</h6>
                {this.renderItems()}
                <button
                  className="btn dark-btn circle float-right pl-4 pr-4"
                  onClick={() => this.setState({ isInputDisabled: false })}
                >
                  تسديد بالأقساط؟
                </button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
