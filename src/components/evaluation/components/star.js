import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { reduxForm } from "redux-form";
import { addRateValue } from "../../../actions";

const StarComponent = (props) => {
  const { item, index, addRateValue, savedRates } = props;
  const [rate, setRate] = useState(item.rate || 0);
  const [answersArray, setAnswersArray] = useState([]);
  const [enableEditing, setEnableEditing] = useState(true);
  const changeLocalRate = (value) => {
    const rateValue =
      value === 1
        ? "VeryBad"
        : value === 2
        ? "Bad"
        : value === 3
        ? "Nothing"
        : value === 4
        ? "Agree"
        : value === 5 && "VeryAgree";
    const RateObject = {
      ratingQuesionId: item?.id,
      answer: rateValue,
    };
    addRateValue(RateObject);
    setRate(value);
  };
  useEffect(() => {
    setAnswersArray([...answersArray, rate]);
  }, [rate]);
  useEffect(() => {
    if (savedRates?.length) {
      for (let index = 0; index < savedRates.length; index++) {
        const element = savedRates[index];
        if (element?.ratingQuesionId === item?.id) {
          setEnableEditing(false);
          element?.answer === "VeryBad"
            ? setRate(1)
            : element?.answer === "Bad"
            ? setRate(2)
            : element?.answer === "Nothing"
            ? setRate(3)
            : element?.answer === "Agree"
            ? setRate(4)
            : element?.answer === "VeryAgree" && setRate(5);
        }
      }
    }
  }, [savedRates]);

  return (
    <StarRatingComponent
      starCount={5}
      value={rate}
      starColor={"#ffe552"}
      emptyStarColor={"#a9acb4"}
      name="rate"
      onStarClick={(value) => changeLocalRate(value)}
      className={
        item.items?.length === index + 1
          ? "w-100 py-3 d-flex justify-content-center my-0 star-size"
          : "w-100 py-3 border-bottom d-flex justify-content-center my-0 star-size"
      }
      editing={enableEditing}
    />
  );
};

function mapStateToProps(state) {
  return {
    rateValue: state.rateValue,
  };
}

const actionCreators = { addRateValue };

export const Star = connect(
  mapStateToProps,
  actionCreators
)(
  reduxForm({
    form: "subscription",
    destroyOnUnmount: false,
  })(withRouter(StarComponent))
);
