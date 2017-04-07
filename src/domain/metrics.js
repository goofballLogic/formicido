const EventEmitter = require( "events" );

class Metrics extends EventEmitter {

    publish( metric ) {

        this.emit( "metric", metric );

    }

}

const singleton = new Metrics();

module.exports = singleton;
