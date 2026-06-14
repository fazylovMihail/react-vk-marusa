import { FC, useEffect, useState } from "react";
import { Button, Loader, Player } from "@/components";

import "./viewer.scss";

interface ViewerProps {
  videoUrl: string;
  onClose: () => void;
}

export const Viewer: FC<ViewerProps> = ({ videoUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleClickEsc);

    return () => window.removeEventListener("keydown", handleClickEsc);
  }, [onClose]);

  return (
    <div className="viewer">
      <div className="viewer__content">
        <div
          className={`viewer__video ${isLoading ? "viewer__video--load" : ""}`}
        >
          <Player
            videoUrl={videoUrl}
            onReady={() => setIsLoading(false)}
            onBuffering={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          />
          {isLoading && <Loader />}
        </div>
        <Button
          className="btn btn--close viewer__close-btn"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={onClose}
        >
          <svg className="btn__icon" width="24" height="24">
            <use xlinkHref="/sprite.svg#icon-close" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
