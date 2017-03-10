export default function embeddedBrowser( ns ) {
    
    const { bus, uuid, notify } = ns;
    
    document.addEventListener( "submit", function( e ) {
    
        if ( e.target.id === "embedded-browser-controls" ) {
        
            e.preventDefault();
            e.stopPropagation();
            var url = e.target.location.value;
            document.querySelector( "#embedded-browser" ).src = url;
            
        }
        
    } );
   
    window.addEventListener( "message", e => {

        if ( !( e.data && e.data.args && e.data.type === "agent-response" ) ) { return; }
        var received = { origin: e.origin, data: e.data };
        bus.emit( "agent-response", received );

    } );
    
    var isDebug = false;
    
    function remote( js, timeout ) {
    
        var frame = document.querySelector( "#embedded-browser" );
        
        return new Promise( ( resolve, reject ) => {

            var correlationId = uuid();
            var isActive = true;
            const receiveResponse = received => {

                if ( !( received && received.data && received.data.cid === correlationId ) ) { return; }
                bus.removeListener( "agent-response", receiveResponse );
                if ( !isActive ) { return; }
                isActive = false;
                if ( isDebug ) { notify( "Reply to: " + correlationId ); }
                var data = received.data;
                var args = [].concat( data.args || [] );
                if ( data.isSuccess ) {
                    
                    resolve.apply( null, args );
                    
                } else {
                    
                    reject.apply( null, args );
                    
                }

            };
            bus.on( "agent-response", receiveResponse );
            if ( isDebug ) { notify( "Remoting: " + correlationId ); }
            frame.contentWindow.postMessage( { cid: correlationId, js: js }, "*" );
            setTimeout( function() {
                
                if ( !isActive ) { return; }
                isActive = false;
                if ( isDebug ) { notify( "Timed out: " + correlationId ); }
                bus.removeListener( "agent-response", receiveResponse );
                reject( new Error( "Timed out" ) );
                
            }, timeout || 5000 );
            
        } );
        
    }
            
            
    function poll( interval, timeout, testScript ) {
        
        return new Promise( ( resolve, reject ) => {
            
            var isActive = true;
            function task() {
                   
                testScript()
                    .catch( err => { console.log( err ); return false; } )
                    .then( result => {
                        
                        if ( !isActive ) { return; }
                        if ( result ) { 
                            
                            resolve();
                            isActive = false;
                            
                        } else {
                            
                            if ( isDebug ) { notify( "Scheduling another poll" ); }
                            setTimeout( task, interval );
                            
                        }
                            
                    } );
                
            }
            setTimeout( task, interval );
            setTimeout( function() {
                
                if ( !isActive ) { return; }
                isActive = false;
                reject( "Polling timed out: " + testScript );
                
            }, timeout );

        } );
        
    }
    
    bus.on( "run-step", detail => {
        
        isDebug = !!detail.debug;
        var frame = document.querySelector( "#embedded-browser" );
        if ( !frame ) {
            
            console.warn( "No embedded browser" );
            
        } else {
            
            var dynamicArgs = Object.keys( detail.args || {} );
            var args = [ "frame", "remote", "poll" ].concat( dynamicArgs ).concat( detail.script );
            var script = Function.apply( null, args );
            var dynamicArgValues = dynamicArgs.map( x => detail.args[ x ] );
            var start = Date.now();
            Promise.resolve()
                .then( () => script.apply( null, [ frame, remote, poll ].concat( dynamicArgValues ) ) )
                .then( () => null, err => err )
                .then( err => ( { detail, err, start, end: Date.now() } ) )
                .then( outcome => bus.emit( "step-complete", outcome ) );

        }
        
    } );
    
}
