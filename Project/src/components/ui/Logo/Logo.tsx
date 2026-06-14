import { FC } from "react";

import { logosImages } from "@/assets/images";

interface LogoProps {
  blockName: string;
  width: number;
  height: number;
  modify: "black" | "white";
}

export const Logo: FC<LogoProps> = ({ blockName, width, height, modify }) => {
  const desktopSrc =
    modify === "black"
      ? logosImages.black.logoDesktopBlack
      : logosImages.white.logoDesktopWhite;
  const desktopSrc2x =
    modify === "black"
      ? logosImages.black.logoDesktopBlack2x
      : logosImages.white.logoDesktopWhite2x;

  const mobileSrc =
    modify === "black"
      ? logosImages.black.logoMobileBlack
      : logosImages.white.logoMobileWhite;
  const mobileSrc2x =
    modify === "black"
      ? logosImages.black.logoMobileBlack2x
      : logosImages.white.logoMobileWhite2x;

  return (
    <picture className={`${blockName}__logo-picture`}>
      <source
        media="(max-width: 767px)"
        srcSet={`${mobileSrc} 1x, ${mobileSrc2x} 2x`}
      />
      <img
        className={`${blockName}__logo-image`}
        src={desktopSrc}
        srcSet={`${desktopSrc} 1x, ${desktopSrc2x} 2x`}
        width={width}
        height={height}
        alt="Логотип компании Маруся"
      />
    </picture>
  );
};
