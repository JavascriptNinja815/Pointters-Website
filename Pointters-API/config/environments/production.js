
module.exports = {
    apiName: 'Pointers-API',
    error: {
        stackTraceLimit: 12
    },
    optExpiresIn: 24 * 3600 * 1000,
    rateLimit: 1000,
    port: 9000,

    jwt: {
        secret: 'pointters-secret-key',
        expiresIn: 3600000 * 24 * 365,
    },
    dbpath: 'mongodb://localhost/pointters-api',

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    pagination: {
        requests: 100,
        offers: 100,
        postComments:100,
        requestOffers:100,
        categories:100,
        serviceReviews:100
    },
    easyPost:{
        ApiKey: 'y1ssBgKnItXIiHlu5McAEQ'
    },
    redis:{
        url:'redis://127.0.0.1:6379'
    },
    rateLimitCalls:{
        duration: 60000,
        max: 100,
        blacklist: [],
        whitelist: []
    },
    compress:{threshold:1024}

};
