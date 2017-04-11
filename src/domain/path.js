const PathStep = require( "./path-step" );
const paths = require( "./paths" );

const singletonValue = maybeValues => Array.isArray( maybeValues )
    ? maybeValues[ 0 ]
    : maybeValues;

const multiValue = maybeValues => Array.isArray( maybeValues )
    ? maybeValues
    : [ maybeValues ];

const generationLoopSafety = { };

class Path {

    constructor( data ) {

        this.data = data;
        this.id = data.id;
        if ( !this.id ) { throw new Error( "No id specified" ); }
        this.name = singletonValue( data.name );
        const steps = this.data.steps = this.data.steps || [];
        this.steps = steps.map( x => new PathStep( x ) );
        this.compensations = this.data.compensations = this.data.compensations || [];

    }

    remove( stepId ) {

        this.steps = this.steps.filter( s => s.data.id !== stepId );
        return Promise.resolve();

    }

    fetch( stepId ) {

        const found = this.steps.find( s => s.data.id === stepId );
        return found
            ? Promise.resolve( found )
            : Promise.reject( "Not found" );

    }

    fetchOrCreate( stepId, step ) {

        const found = this.steps.find( s => s.data.id === stepId );
        if ( found ) {

            return Promise.resolve( found );

        } else {

            const newStep = new PathStep( { id: stepId, step } );
            this.steps.push( newStep );
            return this.save().then( () => newStep );

        }

    }

    consume( values ) {

        const accept = {

            "path-name": [ singletonValue, "name" ],
            "compensations": [ multiValue, "compensations" ]

        };
        Object.keys( accept ).filter( key => key in values ).forEach( key => {

            const [ acceptor, prop ] = accept[ key ];
            const raw = values[ key ];
            this.data[ prop ] = acceptor( raw );

        } );

    }

    save() {

        return paths.save( this );

    }

    describe() {

        return {

            name: this.name,
            id: this.id

        };

    }

    generateJS( memo ) {

        memo = memo || {};
        if ( this.id in memo ) {

            return memo;

        } else {

            memo[ this.id ] = Object.assign( this.describe(), {

                stepScripts: this.steps.map( s => s.script() ),
                compensations: this.data.compensations

            } );
            return Promise.all(

                this.data.compensations.filter( id => !( id in memo ) ).map( id =>

                    paths.fetch( id ).then( path => path.generateJS( memo ) )

                )

            ).then( () => memo );

        }

    }

    serialize() {

        this.data.steps = this.steps.map( s => s.serialize() );
        return this.data;

    }

    stepDescriptions() {

        return this.steps.map( s => s.describe() );

    }

    compensationDescriptions() {

        return paths.describe( this.data.compensations );

    }

}

module.exports = Path;
