import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../Utils/formatDuration";
import { formatTimeAgo } from "../Utils/formatTimeAgo";
import { formatTitle } from "../Utils/formatTitle";
import { Button } from "./Button";
import { CheckCircle2, Subtitles, Volume2, VolumeX } from "lucide-react";
import { VideoProps } from "../types/VideoProps";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSubtitlesOFF, setIsSubtitlesOFF] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) {
      return;
    }

    if (isVideoPlaying && !isPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a
        href={`/watch?v=${id}`}
        className="relative aspect-video"
        onClick={(e) => e.preventDefault()}
      >
        {isVideoPlaying && (
          <div className="absolute flex gap-1 top-1 right-1 bg-secondary-dark p-1 rounded-md z-10">
            <Button
              variant="plain"
              size="inner"
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            >
              {!isMuted && <Volume2 style={{ color: "white" }} />}
              {isMuted && <VolumeX style={{ color: "white" }} />}
            </Button>
            <div className="h-inherit w-0.5 rounded bg-secondary opacity-40 "></div>
            <Button
              variant="plain"
              size="inner"
              type="button"
              onClick={() => {
                setIsSubtitlesOFF(!isSubtitlesOFF);
              }}
            >
              <Subtitles style={{ color: isSubtitlesOFF ? "white" : "red" }} />
            </Button>
          </div>
        )}
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-lg"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 rounded font-medium">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          ref={videoRef}
          muted={isMuted}
          playsInline
          preload="none"
          src={videoUrl}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/profile?id=${channel.id}`} className="flex-shrink-0">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={channel.profileUrl}
            alt="Profile"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${channel.id}`} className="font-bold">
            {formatTitle(title)}
          </a>
          <div className="flex gap-0.5 items-center">
            <a
              href={`/profile?id=${channel.id}`}
              className="text-secondary-text text-sm"
            >
              {channel.name}
            </a>
            {channel.verified && (
              <CheckCircle2 className="w-4 fill-black text-white mt-0.5" />
            )}
          </div>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views •{" "}
            {formatTimeAgo(new Date(postedAt))}
          </div>
        </div>
      </div>
    </div>
  );
}
