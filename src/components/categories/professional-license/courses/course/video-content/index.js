import React, { useEffect, useRef, useState } from "react";

export default function KnowMore({
  trainer: { name, description, videoUrl, attachments },
}) {
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState();
  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    try {
      if (isPlaying) videoRef.current.play();
      else videoRef.current.puase();
    } catch (error) {}
  }, [isPlaying]);

  return (
    <div
      class="modal fade pl-0 show"
      id="coach-modal"
      tabindex="-1"
      aria-labelledby="modallabel"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-radius-20">
          <div class="modal-closing-btn cursor-pointer" data-bs-dismiss="modal">
            <i class="fas fa-times"></i>
          </div>
          {name && (
            <div class="modal-header border-0 justify-content-center">
              <h3 class="h3 main-color font-weight-bold" id="modallabel">
                {name}
              </h3>
            </div>
          )}
          <div class="modal-body">
            <div class="video-course-wrapper rounded overflow-hidden mb-3">
              <div id="video-title" class="video-title">
                <div class="font-weight-bold">فيديو تعريفى</div>
              </div>
              <video
                id="custom-video-play"
                class="video-tag"
                poster="./images/banner-bg.png"
                src={videoUrl}
                ref={videoRef}
                autoPlay={isPlaying}
                onClick={togglePlay}
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

            {description && (
              <div class="card-container mb-3">
                <div class="card-licences card-hover border-light-bold">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="d-flex align-items-center font-size-20 main-color cursor-pointer">
                      <i class="fas fa-angle-double-left"></i>
                      <span class="ml-2 font-weight-bold">
                        معلومات عن الأستاذ طلال الغامدى
                      </span>
                    </div>
                  </div>
                  <p class="font-size-14">{description}</p>
                </div>
              </div>
            )}
            {/* <div>
              <div class="d-flex align-items-center font-size-20 mb-3 main-color cursor-pointer">
                <i class="fas fa-angle-double-left"></i>
                <span class="ml-2 font-weight-bold">
                  اراءالطلاب فى الأستاذ طلال
                </span>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="status-card">
                    <div class="quote-icon">
                      <h6 class="h6 main-color-light text-center m-0 mr-2">
                        عنوان النجاح
                      </h6>
                      <i class="fas fa-quote-left font-size-12"></i>
                    </div>

                    <div class="card mt-2">
                      <div class="card-body px-2 py-2">
                        <p class="d-flex align-items-center light-gray mb-1 font-size-13">
                          <span class="d-block main-color-light mr-2">
                            اسم الطالب :{" "}
                          </span>
                          سوسن دادر
                        </p>
                        <p class="light-gray font-size-13 m-0">
                          <span class="main-color-light">التقييم : </span>
                          هو ببساطه نص شكلى (بمعنى ان الغايه هى الشكل وليس
                          المحتوى) وبيستخدم فى صناعات المطابع ودور النشر. كان
                          لوريم ابيسوم ولايزال
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="status-card">
                    <div class="quote-icon">
                      <h6 class="h6 main-color-light text-center m-0 mr-2">
                        عنوان النجاح
                      </h6>
                      <i class="fas fa-quote-left font-size-12"></i>
                    </div>

                    <div class="card mt-2">
                      <div class="card-body px-2 py-2">
                        <p class="d-flex align-items-center light-gray mb-1 font-size-13">
                          <span class="d-block main-color-light mr-2">
                            اسم الطالب :{" "}
                          </span>
                          سوسن دادر
                        </p>
                        <p class="light-gray font-size-13 m-0">
                          <span class="main-color-light">التقييم : </span>
                          هو ببساطه نص شكلى (بمعنى ان الغايه هى الشكل وليس
                          المحتوى) وبيستخدم فى صناعات المطابع ودور النشر. كان
                          لوريم ابيسوم ولايزال
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="status-card">
                    <div class="quote-icon">
                      <h6 class="h6 main-color-light text-center m-0 mr-2">
                        عنوان النجاح
                      </h6>
                      <i class="fas fa-quote-left font-size-12"></i>
                    </div>
                    <a href="#" class="d-block mt-2">
                      <img
                        src="./images/twits.png"
                        alt="Twits"
                        class="max-width-100"
                      />
                    </a>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="status-card">
                    <div class="quote-icon">
                      <h6 class="h6 main-color-light text-center m-0 mr-2">
                        عنوان النجاح
                      </h6>
                      <svg
                        class="svg-inline--fa fa-quote-left fa-w-16 font-size-12"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="quote-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                        ></path>
                      </svg>
                      <i class="fas fa-quote-left font-size-12"></i>
                    </div>
                    <a href="#" class="d-block mt-2">
                      <img
                        src="./images/twits.png"
                        alt="Twits"
                        class="max-width-100"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
