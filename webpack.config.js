const path = require( "path" );
const webpack = require( "webpack" );

module.exports = [ {
    
    entry: "./src/client/browser.js",
    module: {
        
        rules: [
    
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    
        ]
    },
    output: {
        
        filename: "bundle.js",
        path: path.resolve( __dirname, "public/js" )
        
    },
    devtool: process.env.DEVTOOL || "source-map",
    plugins:[
        
        new webpack.optimize.UglifyJsPlugin( { sourceMap: true } )
        
    ]
    
}, {
    entry: "./src/client/server.js",
    module: {
        
        rules: [
    
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    
        ]
    },
    externals: {
        
        "server-namespace": "./server-namespace"
        
    },
    output: {
        
        filename: "server.js",
        path: path.resolve( __dirname, "src/runtime" ),
        libraryTarget: "umd"
        
    }
    
} ];
