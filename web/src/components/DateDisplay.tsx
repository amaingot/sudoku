import React from "react";
import moment from "moment";

interface Props {
  value?: string | null | Date | number;
  format?: string;
}

const DateDisplay: React.FC<Props> = ({ value, format }) => {
  if (value) {
    const formatted = format
      ? moment(value).format(format)
      : moment(value).calendar();
    return <>{formatted}</>;
  }

  return <></>;
};

export default DateDisplay;
