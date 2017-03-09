document.addEventListener( "submit", function( e ) {

    if ( e.target.id === "embedded-browser-controls" ) {
    
        e.preventDefault();
        e.stopPropagation();
        var url = e.target.location.value;
        document.querySelector( "#embedded-browser" ).src = url;
        
    }
    
} );

( function() {
    
    function uuid() {
        
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    
    }
    
    function notify( detail ) {
        
        document.dispatchEvent( new CustomEvent( "info-message", { detail: detail } ) );
        
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
    
    var isDebug = false;
    
    function remote( js, timeout ) {
    
        var frame = document.querySelector( "#embedded-browser" );
        return new Promise( ( resolve, reject ) => {

            var correlationId = uuid();
            var isActive = true;
            function receiveReply( received ) {

                if ( isActive && received && received.data && received.data.cid === correlationId ) {

                    if ( isDebug ) { notify( "Reply to: " + correlationId ); }
                    console.log( correlationId, received );
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
            if ( isDebug ) { notify( "Remoting: " + correlationId ); }
            frame.contentWindow.postMessage( { cid: correlationId, js: js }, "*" );
            setTimeout( function() {
                
                if ( !isActive ) { return; }
                isActive = false;
                if ( isDebug ) { notify( "Timed out: " + correlationId ); }
                inboxSubscribers.splice( inboxSubscribers.indexOf( receiveReply ), 1 );
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
    
    document.addEventListener( "run-script", e => {

        isDebug = !!e.detail.debug;
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
    
    document.addEventListener( "click", e => {
        
        if ( e.target.tagName !== "BUTTON" ) { return; }
        if ( !e.target.classList.contains( "redirect-form" ) ) { return; }
        var form = e.target.closest( "form" );
        if ( !form ) { return; }
        var originalAction = form.action;
        form.action = e.target.value;
        document.dispatchEvent( new CustomEvent( "ajax-submit", { detail: form } ) );
        setTimeout( function() {
            
            form.action = originalAction;
            
        }, 100 );

    } );

}() );
