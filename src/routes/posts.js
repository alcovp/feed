import {Router} from 'express';
import {createComment, createPost, dislikePost, getPosts, likePost} from "../service/posts";
import {roleMiddleware} from "../middleware/routes";
import {getTrough} from "../service/troughs";
import {upload} from "./common"

const router = Router();

router.get('/:troughId', async function (req, res, next) {
    const posts = await getPosts(
        req.params.troughId,
        req.query.page || 1
    );
    const trough = await getTrough(req.params.troughId);
    res.render('posts', {
        trough: trough,
        posts: posts,
        username: req.user.username
    });
});
router.post('/:troughId', roleMiddleware(['admin', 'writer']), upload.single('image'), async function (req, res, next) {
    await createPost(
        req.user._id,
        req.params.troughId,
        req.body.text,
        req.file ? req.file.filename : null
    );
    res.redirect('/feed/posts/' + req.params.troughId);
});
router.post('/like/:id', async function (req, res, next) {
    likePost(
        req.params.id,
        req.user._id
    ).then(result => {
        res.json(result);
    });
});
router.post('/dislike/:id', async function (req, res, next) {
    dislikePost(
        req.params.id,
        req.user._id
    ).then(result => {
        res.json(result);
    });
});
router.post('/comment/:id', async function (req, res, next) {
    await createComment(
        req.user._id,
        req.params.id,
        req.body.text
    );
    res.redirect('/feed/posts/' + req.query.troughId);
});

export default router;