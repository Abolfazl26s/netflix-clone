"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  trailerKey?: string;
  mediaTitle?: string;
}

function TrailerPlayer({ trailerKey, mediaTitle }: Props) {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative h-[56.25vw] max-h-[80vh] w-full">
      {" "}
      {/* Aspect ratio 16:9 */}
      {trailerKey ? (
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          playing
          loop
          muted={muted}
          controls={false}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black">
          <p className="text-white">No Trailer Available</p>
        </div>
      )}
      {/* Overlay و دکمه Mute */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#141414] to-transparent" />
      <div className="absolute bottom-10 right-10">
        <button
          onClick={() => setMuted(!muted)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-black/50 transition hover:border-white hover:bg-black/70"
        >
          {muted ? (
            <SpeakerXMarkIcon className="h-7 w-7 text-white" />
          ) : (
            <SpeakerWaveIcon className="h-7 w-7 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default TrailerPlayer;
