![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=NTRtOFlhYTlGbHpSMFA0b21iREIxZTZwQWRHK1AyWlQxWHAzQzJRVXhvND0tLXBQZC9XZ3ltcC9pVjVpT2lxTUg1Znc9PQ==--8cc11b84cc9a7dd51e6dcccafdfb465f13bbd75b)

# formicido
Site monitor like an ant

## Getting started
Formicido is a library which contains a functional express.js web application which can be used for configuring your scripts. To install the library and run the configuration app, do thusly:

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

> node index
Running { port: 8888,
  repo: { root: '/home/goofballLogic/src/my-project/monitor/data' } }
Configuration fixture is running at: http://localhost:8888

```



## Testing
Thanks to the good people at BrowserStack, this application is being automatically tested cross-browser. This means that we can drive selenium tests running in Travis as part of our CI build. We use Browserstack selenium bindings along with Cucumber.
[More about testing with Selenium](https://github.com/goofballLogic/formicido/wiki/Testing)
