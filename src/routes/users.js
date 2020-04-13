import {Router} from 'express';
import {getUsers} from "../service/users";

const router = Router();

router.get('/', async function (req, res, next) {
    const users = await getUsers();
    if (req.user.role !== 'admin') {
        users.forEach(user => delete user.lastLogin);
    }
    res.render('users', {
        users: users,
        username: req.user.username,
        role: req.user.role
    });
});

export default router;
