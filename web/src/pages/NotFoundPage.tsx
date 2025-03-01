import React from "react";
import ErrorPage from "./ErrorPage";

const NotFoundPage: React.FC = () => {
  const errorHeadline = "404";
  const errorTitle = "You have found a secret place.";
  const errorDescription =
    "Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.";

  return (
    <ErrorPage
      errorHeadline={errorHeadline}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
    />
  );
};

export default NotFoundPage;
