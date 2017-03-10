import EventEmitter from "events";


function uuid() {
        
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});

}
    
function app( ns ) {
    
    ns.bus = new EventEmitter();
    ns.uuid = uuid;
    ns.notify = message => ns.bus.emit( "info-message", message );
    
}
export default app;
