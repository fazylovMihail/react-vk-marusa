import { FC } from "react";
import { CustomLink } from "../CustomLink";

import "./social.scss";

interface SocialProps {
  url: string;
  iconId: string;
}

export const Social: FC<SocialProps> = ({ url, iconId }) => {
  return (
    <CustomLink className="social" to={url}>
      <svg className="social__icon" width={36} height={36}>
        <use xlinkHref={`/sprite.svg#${iconId}`} />
      </svg>
    </CustomLink>
  );
};
