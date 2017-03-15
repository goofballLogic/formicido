import EventEmitter from "events";
import stepRunner from "./enrichers/step-runner";
import pathRunner from "./enrichers/path-runner";
import scriptRunner from "./enrichers/script-runner";

function uuid() {
        
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});

}

class DebuggableEventEmitter extends EventEmitter {
    
    constructor( options ) {
        
        super();
        this.options = options;
        
    }

    emit( ...args ) {
        
        if ( this.options.debug ) { console.log( args ); }
        return super.emit.apply( this, args );
        
    }   
    
}

function app( ns ) {
    
    ns.options = { debug: false };
    ns.bus = new DebuggableEventEmitter( ns.options );
    
    ns.uuid = uuid;
    ns.notify = message => ns.bus.emit( "info-message", message );
    ns.debug = message => ns.options.debug ? ns.bus.emit( "debug-message", message ) : false;
    ns.error = message => ns.bus.emit( "error-message", message );
    
    stepRunner( ns );
    pathRunner( ns );
    scriptRunner( ns );
    
}
export default app;