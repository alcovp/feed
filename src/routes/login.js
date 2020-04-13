import {Router} from 'express';
import passport from "passport";
import {updateLastLogin} from "../service/account";

const router = Router();

router.get('/', async function (req, res, next) {
    res.render('login', {user: req.user});
});
router.post('/', passport.authenticate('local'), async function (req, res, next) {
    await updateLastLogin(req.user._id);
    res.redirect('/feed/troughs');
});

export default router;
