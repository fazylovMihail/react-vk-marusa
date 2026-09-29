import { FC, HTMLAttributes } from "react";

import "./error-label.scss";

interface ErrorLabelProps extends HTMLAttributes<HTMLSpanElement> {
  message: string;
}

export const ErrorLabel: FC<ErrorLabelProps> = ({ message, ...props }) => {
  return (
    <span className="error-label" {...props}>
      Ошибка!
      <br />
      {message}
    </span>
  );
};
