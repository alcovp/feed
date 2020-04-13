export const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/feed/login');
    }
};
export const roleMiddleware = (roles) => (req, res, next) => {
    if (roles && roles.includes(req.user.role)) {
        next();
    } else {
        res.sendStatus(401);
    }
};
export const dumbFuckMiddleware = (roles) => (req, res, next) => {
    if (roles && roles.includes(req.user.role)) {
        next();
    } else {
        req.body.text = 'I\'m gay and let everyone know it';
        next();
    }
};