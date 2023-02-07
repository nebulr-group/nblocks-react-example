import React from "react";

const ExampleHeading = (props) => {
  return (
    <h1 className={props.className}>
      This is example heading. Should be shown only if you have access to
      premium plan.
    </h1>
  );
};

export default ExampleHeading;
