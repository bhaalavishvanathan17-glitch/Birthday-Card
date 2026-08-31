import React, { useState } from "react";
import { Video } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function VideoMessage() {
  const [hasVideo, setHasVideo] = useState(true);

  const videoData = birthdayConfig.videoMessage || {
    file: "/video/birthday-message.mp4",
    title: "Watch My Message ❤️",
    subtext: "Some things are better said than written..."
  };

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto text-center" id="video-message">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg">
          <Video className="w-7 h-7" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-pink-100 mb-2">
          {videoData.title}
        </h2>
        <p className="text-pink-200/70 text-xs md:text-sm mb-6">
          {videoData.subtext}
        </p>

        {hasVideo ? (
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black aspect-video">
            <video
              controls
              className="w-full h-full object-cover"
              onError={() => setHasVideo(false)}
            >
              <source src={videoData.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-pink-200/70 text-xs italic">
            (Optional video message file `/public/video/birthday-message.mp4` not found. Video player disabled gracefully.)
          </div>
        )}
      </div>
    </section>
  );
}
