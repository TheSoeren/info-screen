import { Drash } from 'https://deno.land/x/drash@v1.4.4/mod.ts'
import { Cors } from 'https://deno.land/x/drash_middleware@v0.7.6/cors/mod.ts'

import Constants from './Constants.ts'

import Chores from './resources/Chores.ts'

/**
 * The drash server itself
 * @type {Drash.Http.Server}
 */
const server: Drash.Http.Server = new Drash.Http.Server({
    middleware: {
        after_request: [
            // configurations: https://github.com/drashland/deno-drash-middleware/tree/master/cors#configuration
            Cors({
                origin: Constants.ALLOWED_ORIGINS
            })
        ]
    },
    resources: [ Chores ],
    response_output: "application/json"
})

server.run({
    hostname: Constants.SERVER_HOSTNAME,
    port: Constants.SERVER_PORT
})

console.log(`server is running on ${Constants.SERVER_HOSTNAME}:${Constants.SERVER_PORT}`)