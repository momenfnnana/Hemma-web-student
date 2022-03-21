import React, { Component } from "react";

export class RadioField extends Component {
  render() {
    const {
      input,
      meta,
      options,
      onChangeGender = () => true,
      selectedGender,
    } = this.props;
    const hasError = meta?.touched && meta?.error;
    return (
      <React.Fragment>
        <div className="form-check form-check-inline">
          {options.map((o) => (
            <label
              className="form-check-label dark-text small mr-3"
              key={o?.value}
            >
              <input
                type="radio"
                {...input}
                value={o?.value}
                checked={o?.value === selectedGender}
                onChange={(e) => onChangeGender(e.target.value)}
              />
              <img
                src={process.env.PUBLIC_URL + `/assets/images/${o?.value}.png`}
                width="100%"
                className="mr-1 ml-1"
                width="12"
              />
              {o?.title}
            </label>
          ))}
        </div>
        <div>
          {hasError && <small className="w-100 smaller">{meta?.error}</small>}
        </div>
      </React.Fragment>
    );
  }
}
