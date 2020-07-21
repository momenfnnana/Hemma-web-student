import React, { Component } from "react";
import "react-sweet-progress/lib/style.css";
import { CommentsList } from "./comments/comments-list";

export class AskQuestionDetails extends Component {
  state = {
    details: []
  };
  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
              <React.Fragment>
              <div className="row pb-4 pl-4">
                  <div className="col-12">
                    <div className="box-layout box-border shadow-sm p-3">
                    <h6 className="dark-text mb-0 encoded-text">
                        يظهر السؤال هنا
                    </h6>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            <div className="row pl-4">
              <div className="col-md-12">
                <hr />
              </div>
            </div>
            <div className="row pl-4">
              <CommentsList />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
