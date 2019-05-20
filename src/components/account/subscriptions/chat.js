import React, { Component } from "react";
import "./styles.sass";
import { FaCircle } from "react-icons/fa";

export class ChatComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">الدردشة</h6>
            </div>
          </div>
        </div>
        <div className="box-layout shadow-sm w-100">
          <div className="row no-gutters">
            <div className="col-md-4 p-3 border-right">
              <input
                className="form-control small light-font-text"
                placeholder="ابحث هنا"
              />
              <h6 className="light-text small h-55 d-flex align-items-center mb-1 mt-1">
                <FaCircle size={9} className="mr-1" /> دردشة للجميع
              </h6>
              <div className="media chat-item pb-3 d-flex align-items-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/user-circle.png"
                  }
                  alt="Chat img"
                  height="27"
                  className="contain-img mr-2"
                />
                <div className="media-body">
                  <h6 className="small mid-text mb-1">أحمد طه</h6>
                  <h6 className="dark-silver-text smaller mb-0">مشرف</h6>
                </div>
                <h6 className="smaller dark-silver-text en-text mb-0 align-self-start">
                  May, 9
                </h6>
              </div>
              <div className="media chat-item pb-3 d-flex align-items-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/user-circle.png"
                  }
                  alt="Chat img"
                  height="27"
                  className="contain-img mr-2"
                />
                <div className="media-body">
                  <h6 className="small mid-text mb-1">محمد عيسى</h6>
                  <h6 className="dark-silver-text smaller mb-0">مدرب</h6>
                </div>
                <h6 className="smaller dark-silver-text en-text mb-0 align-self-start">
                  May, 9
                </h6>
              </div>
            </div>
            <div className="col-md-8">
              <div className="chat-title border-bottom h-55 d-flex align-items-center justify-content-center">
                <h6 className="dark-text small mb-0">دردشة للجميع</h6>
              </div>
              <div className="chat-window">
                <div className="chat-history">
                  <ul className="list-unstyled">
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-name small">
                          محمد أحمد
                        </span>
                      </div>
                      <div className="d-flex justify-content-end mb-3">
                        <div className="message other-message mid-text light-font-text">
                          اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً
                          في العالم، وتعتبرُ من إحدى اللّغات المُعتمدة في الأمم
                          المُتّحدة، كما إنها تشكّلُ.
                        </div>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-circle.png"
                          }
                          alt="Chat img"
                          height="27"
                          className="contain-img ml-2 align-self-end"
                        />
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-name small">
                          فارس حمودة
                        </span>
                      </div>
                      <div className="d-flex justify-content-end mb-4">
                        <div className="message other-message mid-text light-font-text">
                          اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً
                          في المُتّحدة، كما إنها تشكّلُ.
                        </div>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-circle.png"
                          }
                          alt="Chat img"
                          height="27"
                          className="contain-img ml-2 align-self-end"
                        />
                      </div>
                    </li>

                    <li>
                      <div className="message my-message text-white light-font-text mb-3">
                        اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً في
                        المُتّحدة، كما إنها تشكّلُ.
                      </div>
                    </li>

                    <li>
                      <div className="message my-message text-white light-font-text mb-3">
                        اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً في
                        المُتّحدة، كما إنها تشكّلُ. اللّغة العربيّة من اللّغات
                        العالميّة الأكثر انتشاراً في المُتّحدة، كما إنها تشكّلُ.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="chat-message">
                  <div className="input-chat">
                    <input
                      placeholder="اكتب هنا"
                      className="form-control light-font-text small"
                    />
                    <div className="options">
                      <ul className="list-unstyled list-inline mb-0">
                        <li className="list-inline-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/record.png"
                            }
                            alt="Record"
                            height="20"
                            className="contain-img"
                          />
                        </li>
                        <li className="list-inline-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/attachment.png"
                            }
                            alt="Attach"
                            height="20"
                            className="contain-img"
                          />
                        </li>
                        <li className="list-inline-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/emoji.png"
                            }
                            alt="Emojis"
                            height="20"
                            className="contain-img"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
