import { FC, HTMLAttributes } from "react";

import "./loader.scss";

export const Loader: FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
  return (
    <div className="loader" {...props}>
      <svg className="loader__icon" width="40" height="40">
        <use xlinkHref="/sprite.svg#icon-loader" />
      </svg>
    </div>
  );
};
