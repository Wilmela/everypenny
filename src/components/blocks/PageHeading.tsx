import React from "react";

const PageHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="page-title text-center">{title}</h1>
      <h3 className="page-sub-title text-center my-1">{description}</h3>
    </>
  );
};

export default PageHeading;
