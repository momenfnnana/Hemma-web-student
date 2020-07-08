import React from "react";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ShareQuestionIcon = () => {
  const { addToast } = useToasts();
  return (
    <CopyToClipboard
      text={window.location.href}
      onCopy={() =>
        addToast("تم النسخ", {
          appearance: "success",
          autoDismiss: true
        })
      }
    >
      <div className="favorite-label clickable">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/share.png"}
          className="mr-2 contain-img"
          alt="share"
        />
      </div>
    </CopyToClipboard>
  );
};
