import React, { Component } from "react";
import { apiBaseUrl } from "../../../api/helpers";
import { Route } from "react-router-dom";
import axios from "axios";
import { ProfileSidebar } from "../shared/profile-sidebar/profile-sidebar";
import { EditAccount } from "./edit-account";
import { UpdatePassword } from "./reset-password";
import { UpdatePhone } from "./reset/phone/ResetPhone";
import { UpdateEmail } from "./reset/email/ResetEmail";

export class Account extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-md-3 col-12">
              <ProfileSidebar />
            </div>
            <div className="col-md-9 col-12">
              <Route path="/account/update" component={EditAccount} />
              <Route
                path="/account/update-password"
                component={UpdatePassword}
              />
              <Route path="/account/update-phone" component={UpdatePhone} />
              <Route path="/account/update-email" component={UpdateEmail} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
