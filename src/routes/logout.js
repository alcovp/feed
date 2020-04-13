import {Router} from 'express';

const router = Router();

router.get('/', async function (req, res, next) {
    req.logout();
    res.redirect('/feed');
});

export default router;
