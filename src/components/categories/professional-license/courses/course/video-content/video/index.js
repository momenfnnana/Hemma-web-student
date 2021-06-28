import React, { useEffect, useRef, useState } from "react";

export default function TrainerVideo({
  videoUrl,
  removeTimes,
  name,
  autoPlay
}) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState();
  const togglePlay = () => setIsPlaying(!isPlaying);
  const [videoHasLoaded, setVideoHasLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !videoHasLoaded) return;
    if (isPlaying) videoRef.current.play();
    else videoRef.current.pause();
  }, [isPlaying]);

  useEffect(()=>{
    if(isPlaying && videoRef.current)
    videoRef.current.play();
  },[isPlaying,videoRef.current])

  useEffect(() => {
      if(!removeTimes) return
      setIsPlaying(false);
      videoRef.current.currentTime = 0
  }, [removeTimes]);
  

  const handleVideoHasLoaded = () => setVideoHasLoaded(true);

  return (
    <div class="video-course-wrapper rounded overflow-hidden mb-3">
      <div id="video-title" class="video-title">
      {name &&  <div class="font-weight-bold">{name}</div>}
      </div>
      <video
        id="custom-video-play"
        class="video-tag"
        poster="./images/banner-bg.png"
        src={videoUrl}
        ref={videoRef}
        autoPlay={isPlaying}
        onClick={togglePlay}
        onLoadStart={handleVideoHasLoaded}
      />
      {!isPlaying && (
        <div onClick={togglePlay} class="video-overlay-poster">
          <div class="play-video-btn">
            <i class="fas fa-play"></i>
          </div>
        </div>
      )}
      <div class="video-control">
        <div class="video-control-open-close">
          <i class="fas fa-play"></i>
        </div>
        <div class="video-control-stop">
          <i class="fas fa-stop"></i>
        </div>
        <div class="video-control-volume">
          <i class="fas fa-volume-up"></i>
        </div>
        <input
          type="range"
          name="video-limitation"
          id="video-control-range"
          min="0"
          max="100"
          step="0.1"
          value="0"
        />
        <div class="video-control-time">00:00 / 00:00</div>
        <div class="video-control-fullscreen">
          <i class="fas fa-expand"></i>
        </div>
      </div>
    </div>
  );
}
