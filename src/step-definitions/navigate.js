class Navigate {
    
    static get stepName() { return "Navigate"; }
    static get shape() { return [ 
        
        { label: "URL", name: "url", type: "url" }
        
    ]; }
    
    consume( variables ) {
        
        this.url = variables.url;
        return Promise.resolve();
        
    }
    
    script() {
        
        return [
            
            "function waiter() { frame.removeEventListener( 'load', waiter ); done(); }",
            "frame.addEventListener('load', waiter);",
            `frame.setAttribute( "src", "${this.url}" );`
        
        ];
        
    }
    
}

module.exports = Navigate;
