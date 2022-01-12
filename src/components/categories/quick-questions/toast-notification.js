import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import swal from "@sweetalert/with-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BitlyHelper from "../../../utils/BitlyHelper";

export const ToastDemo = ({ copyLink }) => {
  const [shortenUrl, setShortedUrl] = useState("");
  const { addToast } = useToasts();
  useEffect(() => {
    BitlyHelper(window.location.origin.toString() + copyLink.link)
      .then((res) => {
        if (res.url) setShortedUrl(res.url);
      })
      .catch(() => {
        swal("عفواً", "حدث خطأ ", "error", {
          button: "متابعة",
        });
      });
  }, []);

  return (
    <CopyToClipboard
      text={shortenUrl}
      onCopy={() =>
        addToast("تم النسخ", {
          appearance: "success",
          autoDismiss: true,
        })
      }
    >
      <button className="btn btn-xs unset-height small light-btn light-font-text mr-2">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/copy.png"}
          className="mr-2 contain-img"
        />
        {copyLink.btnName}
      </button>
    </CopyToClipboard>
  );
};
