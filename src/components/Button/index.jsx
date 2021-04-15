import React from "react";
import "./Button.css";

const Button = (props) => {
  const { onButtonClick, content, type } = props;
  const cn = `Button ${content === "0" ? "zero" : ""} ${type || ""}`;
  return (
    <div className={cn} onClick={onButtonClick(content)}>
      {content}
    </div>
  );
};

export default Button;
