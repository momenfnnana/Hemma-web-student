import "./checkout.styles.sass";

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions";
import { RecentCoursesSlider } from "./RecentCoursesSlider";
import { MiniCartItemsList } from "./MiniCartItemsList";
import { formatPrice } from "./helpers";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { OnlineShippingAddressForm } from "./OnlineShippingAddressForm";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { BankPayment } from "./BankPayment";
import OnlinePayment from "./OnlinePayment";
import Stepper from './../../shared-components/stepper/index';
import DeliveryStage from './checkout-stages/delivery/index';
import PaymentStage from './checkout-stages/payment-stage/index';

class CheckoutComponent extends Component {
  state = {
    busy: true,
    activeTab: "online",
    isShippingAddressFilled:false,
    currentStepIndex : 0
  };

  constructor(props) {
    super(props);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  /**
   * Set the active tab
   */
  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  setTokenforAnonymous(hashRoute)
  {
      if(hashRoute && hashRoute !== "")
      {
          let tokenAnonymous = hashRoute.split("=");
          localStorage.setItem("token",tokenAnonymous[1]);
      }
  }

  componentDidMount() {
    this.setTokenforAnonymous(this.props.location.hash);
    if(this.props.location.pathname == "/cart/anonymouscheckout")
    {
      this.setState({ activeTab: 'online' });
    }
    this.props
      .getCart()
      .then(result => {
        this.setState({
          busy: false
        });
      })
      .catch(err => {
        console.error("Error while fetching the cart");
        this.setState({
          busy: false
        });
      });
  }

  nextStep(){
    const {currentStepIndex:prevStepIndex} = this.state
    this.setState({currentStepIndex:prevStepIndex + 1})
  }

  onFillShippingAddress =(values)=>{
    this.setState({isShippingAddressFilled:true,deliveryData:values})
    this.nextStep()
  };
  render() {
    const cart = this.props.cart;
    const path = this.props.location.pathname;

    return (
      <Fragment>
        <section className="cart-section">
          <div className="container">
                <h3 className="dark-text mb-0 mt-4">تأكيد الإشتراك</h3>
            <div className="row">
              <div className="col-md-4 mt-5">
                  <MiniCartItemsList />
              </div>
              <div className="col-md-8 mt-5">
            <Stepper currentStepIndex={this.state.currentStepIndex}>
              {cart && cart.requireShippingAddress  &&  (
                <Stepper.Step>
                  <DeliveryStage cart={cart} onFillShippingAddress={this.onFillShippingAddress} activeTab={this.state.activeTab} />
                </Stepper.Step>
              )}
              <Stepper.Step>
                <PaymentStage cart={cart} deliveryData={this.state.deliveryData} path={path} activeTab={this.state.activeTab} setActiveTab={this.setActiveTab} isShippingAddressFilled={this.state.isShippingAddressFilled} />
              </Stepper.Step>
              </Stepper>
              </div>
            </div>


            <div className="row mt-4">
              <div className="col-md-4">

                {/* <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
                  {this.state.activeTab == "bank" ? (
                    <React.Fragment>
                      {cart && cart.requireShippingAddress && (
                        <ShippingAddressForm onFillShippingAddress={this.onFillShippingAddress} />
                      )}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {cart && cart.requireShippingAddress && (
                        <OnlineShippingAddressForm onFillShippingAddress={this.onFillShippingAddress} />
                      )}
                    </React.Fragment>
                  )}
                  <div className="pt-2 pb-3">
                    <div className="pl-4 pr-4 pt-2 pb-1 d-flex flex-row align-items-center">
                      <h6 className="mid-text mb-0 mt-0 mr-3">المبلغ الكلي</h6>
                      <h4 className="dark-text mb-0 mt-0">
                        <span className="en-text">
                          {formatPrice(
                            cart && (cart.installment || cart.total)
                          )}
                        </span>{" "}
                        ريال
                      </h4>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="col-md-8 mt-3">
                <div className="row">
                  {/* <div className="col-12">
                    <Nav tabs className="custom-tabs w-50 mx-auto">
                      { path !== '/cart/anonymouscheckout' && 
                       <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "bank"
                          })}
                          onClick={() => this.setActiveTab("bank")}
                        >
                          تحويل بنكي
                        </NavLink>
                      </NavItem> }
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "online"
                          })}
                          onClick={() => this.setActiveTab("online")}
                        >
                          بطاقة إئتمانية
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="bank">
                        <BankPayment  isShippingAddressFilled={this.state.isShippingAddressFilled}/>
                      </TabPane>
                      <TabPane tabId="online">
                        <OnlinePayment isShippingAddressFilled={this.state.isShippingAddressFilled} />
                      </TabPane>
                    </TabContent>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {path !== '/cart/anonymouscheckout' && 
        <section className="courses-section section-padder">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="dark-text pb-3">اشترك بدورات أخرى؟</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <RecentCoursesSlider />
              </div>
            </div>
          </div>
        </section>}
        
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

const actionCreators = {
  getCart
};

export default connect(
  mapStateToProps,
  actionCreators
)(CheckoutComponent);
