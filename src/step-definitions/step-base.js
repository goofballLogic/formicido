class StepBase {

    constructor( js ) {

        this.js = js;
        this.args = {};

    }

    consume( variables ) {

        throw new Error( "Implement consume( variables ) to set arguments to your script" );

    }

    script() {

        const valueList = key => Array.isArray( this.args[ key ] )
            ? this.args[ key ].join( ", " )
            : this.args[ key ] || "";
        const argsList = Object.keys( this.args )
            .map( key => [ key, valueList( key ) ] )
            .map( ( [ key, values ] ) => `${key}: ${values}` )
            .join( ", " );
        return {

            script: this.js,
            args: this.args,
            description: this.constructor.stepName + " (" + argsList + ")"

        };

    }

}
module.exports = StepBase;
