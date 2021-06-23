import React, { useEffect, useRef, useState } from "react";
import { AttachmentRenderer, attachmentsForammter } from "./attachments-reducer";
import NoTrianerVideo from "./no-video";
import TrainerVideo from "./video";

export default function KnowMore({
  trainer: { name, description, videoUrl, attachments,id },
}) {
  const [removeTimes, setRemoveTimes] = useState(0);
  const handleClose = () => setRemoveTimes((c) => c + 1);
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
          <div
            class="modal-closing-btn cursor-pointer"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
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
          <AttachmentRenderer attachments={attachments}removeTimes={removeTimes} />
            
            {/* {videoUrl ? (
              <TrainerVideo removeTimes={removeTimes} />
            ) : (
              <NoTrianerVideo />
            )} */}

            {description && (
              <div class="card-container mb-3">
                <div class="card-licences card-hover border-light-bold">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="d-flex align-items-center font-size-20 main-color cursor-pointer">
                      <i class="fas fa-angle-double-left"></i>
                      <span class="ml-2 font-weight-bold">
                        معلومات عن الأستاذ {name}
                      </span>
                    </div>
                  </div>
                  <p class="font-size-14">{description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
