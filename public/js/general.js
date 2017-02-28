( function() {
    
    function uuid() {
        
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    
    }
    
    var inboxSubscribers = [];
    
    function notifySubscribers( received ) {
        
        inboxSubscribers = inboxSubscribers.filter( function( x ) { return !!x; } );
        for( var i = 0; i < inboxSubscribers.length; i++ ) {
        
            var subscriber = inboxSubscribers[ i ];
            setTimeout( function() { subscriber( received ); } );
            
        }
        
    }
    
    window.addEventListener( "message", e => {

        if ( e.data && e.data.args && e.data.type === "agent-response" ) {

            var received = { origin: e.origin, data: e.data };
            notifySubscribers( received );

        }
        
    } );
    
    function remote( js, timeout ) {
    
        var frame = document.querySelector( "#embedded-browser" );
        return new Promise( ( resolve, reject ) => {

            var correlationId = uuid();
            console.log( "Start", correlationId );                        
            var isActive = true;
            function receiveReply( received ) {

                if ( isActive && received && received.data && received.data.cid === correlationId ) {

                    console.log( "Handling reply", correlationId, received );                        
                    isActive = false;
                    inboxSubscribers.splice( inboxSubscribers.indexOf( receiveReply ), 1 );
                    var data = received.data;
                    var args = [].concat( data.args || [] );
                    if ( data.isSuccess ) {
                    
                        resolve.apply( null, args );
                    
                    } else {
                    
                        reject.apply( null, args );
                    
                    }
                    
                }

            }
            inboxSubscribers.push( receiveReply );
            frame.contentWindow.postMessage( { cid: correlationId, js: js }, "*" );
            setTimeout( function() {
                
                if ( !isActive ) { return; }
                isActive = false;
                console.log( "Timed out", correlationId );                        
                inboxSubscribers.splice( inboxSubscribers.indexOf( receiveReply ), 1 );
                reject( new Error( "Timed out" ) );
                
            }, timeout || 5000 );
            
        } );
        frame.contentWindow.postMessage( js, "*" );
        
    }
            
            
    function poll( interval, timeout, testScript ) {
        
        return new Promise( ( resolve, reject ) => {

            function task() {
                   
                console.log( "Evaluating poll script" );
                testScript().then(
                    
                    result => {
                        
                        if ( !isActive ) { return; }
                        console.log( "Polling got", result );
                        if ( result ) { 
                            
                            resolve();
                            isActive = false;
                            
                        } else {
                            
                            console.log( "Scheduling another poll" );
                            setTimeout( task, interval );
                            
                        }
                        
                    },
                    err => {
                        
                        if ( !isActive ) { return; }
                        isActive = false;
                        console.log( "Polling script reject" );
                        reject( err );
                        
                    }
                    
                );
                
            }
            var isActive = true;
            setTimeout( task, interval );
            setTimeout( function() {
                
                if ( !isActive ) { return; }
                isActive = false;
                reject( "Polling timed out: " + testScript );
                
            }, timeout );

        } );
        
    }
    
    document.addEventListener( "run-script", e => {

        var frame = document.querySelector( "#embedded-browser" );
        if ( !frame ) {
            
            console.warn( "No embedded browser" );
            
        } else {
            
            var dynamicArgs = Object.keys( e.detail.args || {} );
            var args = [ "frame", "remote", "poll" ].concat( dynamicArgs ).concat( e.detail.script );
            var script = Function.apply( null, args );
            var dynamicArgValues = dynamicArgs.map( x => e.detail.args[ x ] );
                
            Promise.resolve()
                .then( () => script.apply( null, [ frame, remote, poll ].concat( dynamicArgValues ) ) )
                .then( () => null, err => err )
                .then( maybeErr => ( { evt: e, err: maybeErr } ) )
                .then( outcome => document.dispatchEvent( new CustomEvent( "run-complete", { detail: outcome } ) ) );

        }
        
    } );

}() );