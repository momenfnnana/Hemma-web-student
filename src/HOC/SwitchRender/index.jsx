import React, { useMemo } from "react";

export default function SwitchRender({ path, children,...rest }) {
  const passPropsToChildren = useMemo(() => {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (!child) return;
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          path,
        });
      }
      return child;
    });
    return childrenWithProps;
  }, [children]);

  return <div  {...rest}>{passPropsToChildren}</div>;
}

SwitchRender.Route = ({ children, routePath, path }) => {
  return <>{path === routePath && children}</>;
};
