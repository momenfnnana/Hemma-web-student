import React from 'react'

export default function CampaignVideo({showThumb,toggleShow,videoRef}) {
    return (
        <div
        className="video-wrapper position-relative w-100"
        style={{ position: "relative" }}
      >
        {showThumb && (
          <>
            <img
              src="/assets/images/video-play-icon.png"
              className="position-absolute play-icon absolute-center z-3"
              id="play-icon"
              alt=""
              onClick={toggleShow}
              //   style={{ display: this.state.playIcon ? "block" : "none" }}
            />
            <img
              className="w-100 h-100 z-2 position-absolute absolute-centered rounded"
              src="https://wallpaperaccess.com/full/3458146.jpg"
              loading
              style={{ filter: "blur(5px)" }}
            />
          </>
        )}
        <video
          id="hemma-video"
          className="w-100"
          controls
          autoplay={!showThumb}
          ref={videoRef}
          style={{ display: "block" }}
          onPause={toggleShow}
        >
          <source src="https://hemma.ams3.cdn.digitaloceanspaces.com/videos/videos/V1-Boy.mp4" />
          <div className="pink-shadow stretched-absolute" />
        </video>
      </div>
    )
}
