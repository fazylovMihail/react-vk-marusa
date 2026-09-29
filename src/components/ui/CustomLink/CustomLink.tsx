import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";

import "./link.scss";

export const CustomLink: FC<LinkProps> = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};
