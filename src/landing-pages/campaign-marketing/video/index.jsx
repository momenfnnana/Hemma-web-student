import React from 'react'

export default function CampaignVideo({showThumb,toggleShow,videoRef}) {
    return (
        <div
        className="video-wrapper position-relative w-100"
        style={{ position: "relative" }}
      >
        <video
          id="hemma-video"
          className="w-100"
          controls
          autoplay
          style={{ display: "block" }}
          ref={videoRef}
          src="https://hemma.ams3.cdn.digitaloceanspaces.com/videos/videos/Hemma_Instagram_01%20.mp4"
        >
          <div className="pink-shadow stretched-absolute" />
        </video>
      </div>
    )
}
