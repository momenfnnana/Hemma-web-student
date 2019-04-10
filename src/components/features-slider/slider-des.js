import React from "react";
const SliderDes = props => {
  return (
    <React.Fragment>
      <h6 className="dark-text">{props.data.title}</h6>
      <p className="featureDes dark-text small light-font-text">
        {props.data.description}
      </p>
    </React.Fragment>
  );
};

export default SliderDes;
