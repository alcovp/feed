import {Router} from 'express';
import {createTrough, getTroughs} from "../service/troughs";
import {roleMiddleware} from "../middleware/routes";
import {upload} from "./common";

const router = Router();

router.get('/', async function (req, res, next) {
    const troughs = await getTroughs();
    res.render('troughs', {
        troughs: troughs,
        username: req.user.username
    });
});
router.post('/', roleMiddleware(['admin', 'writer']), upload.single('image'), async function (req, res, next) {
    await createTrough(
        req.user._id,
        req.body.name,
        req.body.description,
        req.file ? req.file.filename : null
    );
    res.redirect('/feed/troughs');
});

export default router;