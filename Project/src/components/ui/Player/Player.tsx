import { FC } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? url;
};

interface PlayerProps {
  videoUrl: string;
  onReady?: () => void;
  onBuffering?: () => void;
  onPlaying?: () => void;
}

export const Player: FC<PlayerProps> = ({
  videoUrl,
  onReady,
  onBuffering,
  onPlaying,
}) => {
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      controls: 1,
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId={getYouTubeId(videoUrl)}
      opts={opts}
      onReady={onReady}
      onStateChange={(event) => {
        if (event.data === 3) onBuffering?.();
        if (event.data === 1) onPlaying?.();
      }}
    />
  );
};
