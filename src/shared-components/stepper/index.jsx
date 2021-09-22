import React, { useCallback, useMemo } from "react";
import "./index.scss";

export default function Stepper({ currentStepIndex = 0, children, ...rest }) {
  const passPropsToChildren = useMemo(() => {
    let _index = 0;
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (!child) return;
      if (React.isValidElement(child)) {
        _index = _index + 1;
        return React.cloneElement(child, {
          order: _index - 1,
          currentStepIndex,
        });
      }
      return child;
    });
    return childrenWithProps;
  }, [children]);

  return <div className="stepper">{passPropsToChildren}</div>;
}

Stepper.Step = ({ children, currentStepIndex, order }) => {
  const show = currentStepIndex === order;
  return <div>{show && children}</div>;
};
