![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=NTRtOFlhYTlGbHpSMFA0b21iREIxZTZwQWRHK1AyWlQxWHAzQzJRVXhvND0tLXBQZC9XZ3ltcC9pVjVpT2lxTUg1Znc9PQ==--8cc11b84cc9a7dd51e6dcccafdfb465f13bbd75b)

# formicido
Site monitor like an ant.

## Getting started
Formicido is a library which contains an express.js web application which can be used for configuring your scripts. Here's a quick-start guide to running the configuration app:

index.js:
```javascript
const formicido = require( "formicido" );
const config = {

    port: 8888,
    repo: { root: __dirname + "/data" }

};
formicido( config ).then( () =>

    console.log( `Configuration fixture is running at: http://localhost:${config.port}` )

);
```
create a folder for data, install formicido, then run:
```bash
mkdir data
npm install formicido --save
node index

Running { port: 8888,
  repo: { root: '/home/goofballLogic/src/my-project/monitor/data' } }
Configuration fixture is running at: http://localhost:8888

```

## Design-time requirements

Although no such requirements exist when running the monitoring tool, certain requirements are imposed in order to use the configuration interface:

* Your site must be capable of running within an IFRAME
* You must run the Formicido javascript agent in your application, so that it can carry out browser-like actions (such as navigation or clicking)

Check out the wiki for more details: https://github.com/goofballLogic/formicido/wiki/Running-the-Formicido-javascript-agent

## Creating your first script

Formicido scripts consist of one or more paths, each of which consist of one or more configured steps. A step is a piece of parameterisable code which can be configured and combined with other configured steps to make up a named path.

For an example walk-through of creating a script, see the wiki: https://github.com/goofballLogic/formicido/wiki/Create-your-first-script


## Metrics



## Testing
Thanks to the good people at BrowserStack, this application is being automatically tested cross-browser. This means that we can drive selenium tests running in Travis as part of our CI build. We use Browserstack selenium bindings along with Cucumber.
[More about testing with Selenium](https://github.com/goofballLogic/formicido/wiki/Testing)
