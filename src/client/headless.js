import app from "./app";
import Zombie from "zombie";

import agent from "./enrichers/headless/agent";

import notifications from "./listeners/headless/notifications";

const ns = { browser: new Zombie() };

[ 
    app, // must be first
    
    notifications, // user-display notifications
    //metricsSink, // relay metrics to the server
    
    agent, // navigation and execution of script against the browser
    
].forEach( module => module( ns ) );

export default ns;