import {Router} from 'express';

const router = Router();

router.get('/image/:id', async function (req, res, next) {
    res.sendFile(process.env.FILE_STORAGE_PATH || "/var/www/feed/" + req.params.id);
});

export default router;