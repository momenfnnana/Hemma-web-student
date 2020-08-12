import React, { Component } from "react";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ShareInitiatives = () => {
  const { addToast } = useToasts();
  return (
    <CopyToClipboard
      text={window.location.href}
      onCopy={() =>
        addToast("تم النسخ", {
          appearance: "success",
          autoDismiss: true,
        })
      }
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/images/share.png"}
        className="clickable"
        alt="share"
      />
    </CopyToClipboard>
  );
};
