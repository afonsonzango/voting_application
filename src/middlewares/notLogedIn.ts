import express, { Request, Response, NextFunction } from 'express';

interface SessionData {
    auth?: boolean;
    username?: string;
}

// Middleware to check if the user is logged in
const notLoggedIn = (req: Request & { session: SessionData }, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.auth) {
        next();
    }else{   
        // User is logged in, proceed to the next middleware or route handler
        return res.redirect('/dashboard/arquive-keys');
    }
};

export default notLoggedIn;