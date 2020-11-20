import React from "react";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const ProgressBar = ({ uploadState, percentUploaded }) =>
    uploadState === "uploading" && (
        <Progress className="ltr-dir en-text" percent={percentUploaded} status="success" />
    );

export default ProgressBar;
