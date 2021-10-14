import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function ClickCapture({ onOutsideClick, children }) {
  const node = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, [onOutsideClick]);

  return <div ref={node}>{children}</div>;
}
ClickCapture.propTypes = {
  onOutsideClick: PropTypes.func,
  children: PropTypes.node,
};

ClickCapture.defaultProps = {
  onOutsideClick: () => null,
  children: null,
};

export default ClickCapture;
