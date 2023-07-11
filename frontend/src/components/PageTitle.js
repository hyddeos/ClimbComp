import React from "react";

function PageTitle(props) {
  return (
    <>
      <h2 className="text-center font-header text-nightsky-950 text-4xl mt-6 mb-0">
        {props.title}
      </h2>
      <h2 className="text-center font-body text-light text-2xl mt-0 mb-4">
        {props.info}
      </h2>
    </>
  );
}

export default PageTitle;
