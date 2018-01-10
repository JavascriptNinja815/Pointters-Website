module.exports = {
    elasticsearch: {
        hosts: [ 'localhost:9200' ]
    },
    timeout: {
        apiTimeout: 30000,
        timeoutOptions: {
            status: 504,
            message: 'service unavailable'
        }
    },
    urlToValidateTokenFacebook: 'https://graph.facebook.com/me/?access_token=XYZ',
    longOfPasswordTemp: 10,
    facebook: {
        appId: '995599163788797',
        appSecret: '4868095834fef8a3538045527b5c7da9',
        version: 'v2.10'
    },
    review: {
        minLengthForComment: 100
    },
    propsToBeEverPrivate: 'settings,password',
    emailSenderingCong: {
        emailRemitentInOpt: 'help@pointters.com',
        sendgridApiKey: process.env.SENDGRID_API_KEY || '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',
        subjectOptEmail: 'Password Reset',
        contentOptEmail: 'Your password was resetted with: '

    },
    pathUnprotected: [
        '/user/login',
        '/user/signup',
        '/user/facebook/token',
        '/user/otp',
        '/user/reset',
        '/user/reset/password',
        {
            path:'/category/:idCategory/sub-category/:idSubCategory',
            method: 'GET'
        },
        {
            path:'/category/:idCategory?',
            method: 'GET'
        },
        {
            path:'/categories/:idCategory?',
            method: 'GET'
        }
    ],
    schedule: {
        BounceEmail: '00 00 * * * *',
        SpamEmail: '00 00 * * * *',
        InvalidEmail: '00 00 * * * *'
    },
    checkr: {
        authToken: 'f2416654047474c3d1257bb7c6894e0a0482c8c8'
    },
    pagination: {
        serviceReviews:100,
        requests: 100,
        offers: 100,
        postComments:100,
        requestOffers:100,
        categories:100
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
