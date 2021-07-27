import React from "react";

export const Modal = ({
  children,
  id,
  onClose = () => {},
  title = "",
})=> {
  return (
    <div
      class="modal fade pl-0 show"
      id={id}
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
            onClick={onClose}
          >
            <i class="fas fa-times"></i>
          </div>
          {title && (
            <div class="modal-header border-0 justify-content-center">
              <h3 class="h3 main-color font-weight-bold" id="modallabel">
                {title}
              </h3>
            </div>
          )}
          <div class="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
