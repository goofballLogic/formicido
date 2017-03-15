import "./browser-polyfills";
import "./browser-enhancements";

import app from "./app";

import agentEmitters from "./emitters/browser/agent";

import ajaxFormSubmit from "./enrichers/browser/ajax-form-submit";
import embeddedBrowserWidget from "./enrichers/browser/embedded-browser-widget";

import runners from "./enrichers/browser/runners";

import stepPage from "./enrichers/browser/step-page";
import pathPage from "./enrichers/browser/path-page";
import scriptRunPage from "./enrichers/browser/script-run-page";

import agentListeners from "./listeners/browser/agent";
import notifications from "./listeners/browser/notifications";
import metricsSink from "./listeners/browser/metrics-sink";

const ns = window.formicido = window.formicido || {};

[ 
    app, // must be first
    
    notifications, // user-display notifications
    metricsSink, // relay metrics to the server
    
    ajaxFormSubmit, // ajaxify form submission
    
    agentEmitters, // marshall messages from agent
    agentListeners, // marshall messages to agent
    
    embeddedBrowserWidget, // react to the embedded (iframe) browser control
    runners, // log the results of running stuff
    
    stepPage,
    pathPage,
    scriptRunPage

].forEach( module => module( ns ) );
