import React from "react";
import classes from "./Error.module.css";

function Error(props) {
  return (
    <div className={classes.Error}>
      <div>{props.children}</div>
        Go to HomePage...
    </div>
  );
}

export default Error;
