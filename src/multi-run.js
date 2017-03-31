const scripts = require( "./domain/scripts" );
const express = require( "express" );
const metricsRouter = require( "./metrics-router" );

const eventLog = Symbol( "event-log" );
module.exports = class MultiRun {
    
    constructor( scriptId, options, bus ) {
        
        this.scriptId = scriptId;
        this.options = options;
        this.bus = bus;
        [ "script-complete", "path-complete", "step-complete" ].forEach( evt => {
        
            bus.on( evt, this.handleEvent.bind( this, evt ) );    
            
        } );
        this[ eventLog ] = {};
        this.initMetricsServer();
        
    }
    
    count( eventName ) {
        
        return this[ eventLog ][ eventName ] || 0;
        
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
        
        this.stopRequested = true;
        
    }
    
    runOne() {

        return scripts.fetch( this.scriptId )
            .then( script => script.generateJS() )
            .then( pathScripts => new Promise( ( resolve, reject ) => {
    
                this.bus.once( "script-complete", resolve );
                this.bus.emit( "run-script", { id: this.scriptId, pathScripts } );                
            
            } ) );
        
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
        this.start();
        
    }
    
};

