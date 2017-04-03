const path = require( "path" );

module.exports = {
    app: {
        
        host: "localhost",
        port: 8123,
        origin: "http://localhost:8123"
        
    },
    test: {
        
        port: 8124
        
    },
    headless: {
        
        host: "localhost",
        port: 8125,
        diagnostics: {
        
            filePath: path.resolve( __dirname, "../data/diagnostics" )
        
        }
        
    }
    
};
