import React, { useEffect, useRef, useState } from "react";
import {
  AttachmentRenderer,
  attachmentsForammter,
} from "./attachments-reducer";
import { TrainerDescribtion } from "./description";
import NoTrianerVideo from "./no-video";
import TrainerVideo from "./video";

export default function KnowMore({
  trainer: { name, description, videoUrl, attachments, id },
}) {
  const [removeTimes, setRemoveTimes] = useState(0);
  const handleClose = () => setRemoveTimes((c) => c + 1);

  const renderAttachments = attachments
    ? Object.keys(attachments)?.length
    : false;
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
              {videoUrl && (<TrainerVideo autoPlay videoUrl={videoUrl} removeTimes={removeTimes} />)}
              {description && (<TrainerDescribtion name={name} description={description} />)}
              {renderAttachments ? (<AttachmentRenderer attachments={attachments} removeTimes={removeTimes}/> ) : ( <NoTrianerVideo />)}
          </div>
        </div>
      </div>
    </div>
  );
}
