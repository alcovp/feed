import {Router} from 'express';
import {dumbFuckMiddleware} from "../middleware/routes";
import {createMessage, getHistory} from "../service/chat";

const router = Router();

router.get('/', async function (req, res, next) {
    const history = await getHistory();
    res.render('chat', {
        history: history,
        username: req.user.username
    });
});
router.post('/', dumbFuckMiddleware(['admin', 'writer']), async function (req, res, next) {
    await createMessage(
        req.body.text,
        req.user._id
    );
    res.redirect('/feed/chat');
});

export default router;