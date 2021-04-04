import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import "./index.sass";


Sentry.init({
    dsn: "https://2fde36f1c2fb405db43b8cc9e5f61e8f@o392428.ingest.sentry.io/5536321",
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
