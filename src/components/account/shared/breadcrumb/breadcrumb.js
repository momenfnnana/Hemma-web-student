import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./styles.sass";

const AccountBreadcrumb = props => {
  return (
    <React.Fragment>
      <Breadcrumb className="account-breadcrumb">
        <BreadcrumbItem>
          <a href="#">دوراتي</a>
        </BreadcrumbItem>
        <BreadcrumbItem active>التحصيلي</BreadcrumbItem>
      </Breadcrumb>
    </React.Fragment>
  );
};

export default AccountBreadcrumb;
