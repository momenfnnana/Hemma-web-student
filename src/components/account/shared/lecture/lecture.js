import React, { Component } from "react";
import { FaGraduationCap } from "react-icons/fa";
import "./styles.sass";
import { Link } from "react-router-dom";

export class Lecture extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="lecture-item w-100 d-flex align-items-center mb-4">
          <div className="media w-75">
            <div className="silver-box-bg mr-4 d-flex align-items-center justify-content-center">
              <FaGraduationCap className="dark-text" size="34" />
            </div>
            <div className="media-body mt-2">
              <h6 className="text-white light-font-text mb-0">
                المجال الكهربائي الدرس الثاني
              </h6>
              <ul className="list-inline mt-2">
                <li className="list-inline-item small mt-0">
                  <p className="text-white light-font-text mb-0">
                    أ. طلال محمد{" "}
                  </p>
                </li>
                <li className="list-inline-item light-font-text small mt-0 ml-2">
                  <div className="dark-bg pl-4 pr-4 pt-1 pb-1 rounded">
                    <p className="text-white en-text mb-0">10:54</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-25 d-flex justify-content-end">
            <Link
              to="/live-stream"
              className="btn silver-outline-btn unset-height w-50"
            >
              انضم
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
