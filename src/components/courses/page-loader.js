import React, { Component } from "react";
import ContentLoader from "react-content-loader";

export class PageLoader extends Component {
  render() {
    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ContentLoader height="350" className="mb-4">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="350" />
              </ContentLoader>
              <ContentLoader height="110">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="110" />
              </ContentLoader>
            </div>
            <div className="col-md-8">
              <ContentLoader height="135" className="mb-4">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="135" />
              </ContentLoader>
              <ContentLoader height="400" className="mb-4">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="400" />
              </ContentLoader>
              <ContentLoader height="100">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100" />
              </ContentLoader>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
