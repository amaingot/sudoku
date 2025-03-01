import React from "react";
import moment from "moment";

interface Props {
  value?: string | null | Date | number;
  format?: string;
  short?: boolean;
}

const DateDisplay: React.FC<Props> = ({ value, format, short = true }) => {
  if (value) {
    if (short) {
      const formatted = moment(value).format("MMM D, h:mma").slice(0, -1);

      return <>{formatted}</>;
    }

    const formatted = format
      ? moment(value).format(format)
      : moment(value).calendar();
    return <>{formatted}</>;
  }

  return <></>;
};

export default DateDisplay;
