import {Router} from 'express';
import User from '../models/user';
import passport from "passport";
import {createDefaultUser} from "../service/users";

const router = Router();

router.get('/', async function (req, res, next) {
    res.render('register', {});
});
router.post('/', async function (req, res, next) {
    User.register(createDefaultUser(req.body.username), req.body.password, function (err, user) {
        if (err) {
            return res.render('register', {err: err});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/feed/troughs');
        });
    });
});

export default router;
