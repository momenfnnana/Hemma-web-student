import React, { Component } from "react";
import { useToasts } from 'react-toast-notifications'
import {CopyToClipboard} from 'react-copy-to-clipboard';


export const ToastDemo = () => {
    const { addToast } = useToasts()
    return (
        <CopyToClipboard text={window.location.href}
        onCopy={() => addToast('تم النسخ', {
            appearance: 'success',
            autoDismiss: true,
        })}
        >
            <button
                className="btn btn-xs unset-height small light-btn light-font-text mr-2"
              >
                <img
                    src={
                        process.env.PUBLIC_URL +
                        "/assets/images/copy.png"
                    }
                    className="mr-2 contain-img" />
      مشاركة السؤال
        </button>
        </CopyToClipboard>
    )
}