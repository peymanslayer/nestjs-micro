import * as session from 'express-session';
export const sessionMW = session({
    secret: "wouldn'tyouliketoknow", 
    cookie: {
        maxAge: 10000000, // 1 hour
        httpOnly: true, 
        secure: true, // Requires https connection
    }, 
    // Stores sessions in Mongo DB
    // Gets rid of the annoying deprecated messages
    resave: false, 
    saveUninitialized: true
});
