import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.sass";

Sentry.init({ dsn: "https://5f93c7937f7a40b2aa750dab4c00653f@o392428.ingest.sentry.io/5239902" });

ReactDOM.render(<Sentry.ErrorBoundary fallback={"An error has occurred"}><App /></Sentry.ErrorBoundary>, document.getElementById("root"));
