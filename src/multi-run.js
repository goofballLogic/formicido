const express = require( "express" );
const metricsRouter = require( "./metrics-router" );
const shortid = require( "shortid" );

const requireScripts = () => require( "scripts" ); // delays loading to allow injection of config

const eventLog = Symbol( "event-log" );
module.exports = class MultiRun {
    
    constructor( scriptId, options, bus ) {
        
        this.scriptId = scriptId;
        this.options = options;
        this.bus = bus;
        this.teardown = [];
        [ "script-complete", "path-complete", "step-complete" ].forEach( evt => {
        
            const listener = this.handleEvent.bind( this, evt );
            this.teardown.push( () => bus.removeListener( evt, listener ) );
            bus.on( evt, listener );    
            
        } );
        this[ eventLog ] = {};
        this.initMetricsServer();
        this.runId = shortid();
        
    }
    
    count( eventName ) {
        
        return this[ eventLog ][ eventName ] || 0;
        
    }
    
    dispose() {
        
        this.teardown.forEach( x => x() );    
        return this.stop();
        
    }
    
    initMetricsServer() {
    
        const app = new express();
        app.use( "/metrics", metricsRouter );
        const port = this.options.port || 8080;
        const host = this.options.host || "0.0.0.0";
        
        this.server = app.listen( port, host, e => {
            
            if ( e ) { throw e; }
            console.log( `Metrics available here: http://${host}:${port}/metrics` );
            
        } );
        this.server.unref();
            
    }
    
    start() {
    
        this.running = !this.stopRequested;
        this.current = this.stopRequested ? null : this.runOne().then( 
            
            result => this.handleSuccess( result ), 
            err => this.handleError( err )
            
        );
        
    }
    
    stop() {
        
        const id = this.runId;
        this.bus.emit( "abort-run", { id } );
        this.stopRequested = true;
        const current = this.current || Promise.resolve();
        return current.then( () => new Promise( resolve => this.server.close( resolve ) ) );

    }
    
    runOne() {

        const iteration = this.iteration = ( this.iteration || 0 ) + 1;
        const id = this.scriptId;
        const runId = this.runId;
        return requireScripts().fetch( id ).then( script => 
        
            script.generateJS().then( pathScripts => 
            
                new Promise( resolve => {

                    this.bus.once( "script-complete", resolve );
                    const name = script.name;
                    this.bus.emit( "run-script", { id, iteration, name, runId, pathScripts } );                
        
                } )
                
            )

        );
        
    }    
    
    handleEvent( eventName ) {
        
        if ( !this.running || this.stopRequested ) { return; }
        this[ eventLog ][ eventName ] = ( this[ eventLog ][ eventName ] || 0 ) + 1;
        
    }
    
    handleSuccess( result ) {
        
        this.outcome = { result };
        this.count( "success" );
        this.start();
        
    }
    
    handleError( err ) {
        
        this.outcome = { err };
        this.count( "failure" );
        console.error( err );
        setTimeout( () => this.start(), 1000 );
        
    }
    
};

