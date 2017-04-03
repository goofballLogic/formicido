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

## Running your script in "production" monitoring mode

Once your script is created, the configuration web application is no longer needed, unless you specifically want to run your script in a physical browser.

Instead, Formicido uses a headless (emulated) browser called Zombie.js: http://zombie.js.org/. This won't work for every web application, but will support the majority of well designed web apps.

For an example walk-through of running your script in headless mode, see the wiki: https://github.com/goofballLogic/formicido/wiki/Run-your-first-script-headless

## Metrics

You can launch the metrics endpoint by browsing to /metrics. For example, the configuration mentioned above will expose metrics at http://localhost:8888/metrics. Even when running in "headless" mode, a web server is still started just to serve the metrics.

You might recognise the metrics format as the text-version of Prometheus' exposition formats: https://prometheus.io/docs/instrumenting/exposition_formats/#format-variants-comparison

## Testing
Thanks to the good people at BrowserStack, this application is being automatically tested cross-browser. This means that we can drive selenium tests running in Travis as part of our CI build. We use Browserstack selenium bindings along with Cucumber.
[More about testing with Selenium](https://github.com/goofballLogic/formicido/wiki/Testing)
