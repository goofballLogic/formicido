import "./browser-polyfills";
import "./browser-enhancements";

import app from "./app";

import ajaxFormSubmit from "./enrichers/browser/ajax-form-submit";
import stepPage from "./enrichers/browser/step-page";
import scriptRunPage from "./enrichers/browser/script-run-page";
import embeddedBrowserWidget from "./enrichers/browser/embedded-browser-widget";
import pathRunner from "./enrichers/browser/path-runner";
import pathPage from "./enrichers/browser/path-page";

import notifications from "./listeners/browser/notifications";
import metricsSink from "./listeners/browser/metrics-sink";

const ns = window.formicido = window.formicido || {};

[ 
    app, // must be first
    notifications, 
    metricsSink,
    ajaxFormSubmit, 
    embeddedBrowserWidget, 
    stepPage, 
    scriptRunPage,
    pathPage,
    pathRunner

].forEach( module => module( ns ) );
