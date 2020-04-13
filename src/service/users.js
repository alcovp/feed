import User from "../models/user";
import moment from "moment";

export const getUsers = async () => {
    return await User.find()
        .then(users => users.map(mapUser))
        .catch(err => console.error(err));
};
const mapUser = (user) => {
    return {
        username: user.username,
        date: user.date ? moment(user.date).format('DD.MM.YYYY HH:mm') : "",
        role: user.role,
        lastLogin: user.lastLogin ? moment(user.lastLogin).format('DD.MM.YYYY HH:mm') : ""
    };
};
export const createDefaultUser = (username) => {
    return new User({
        username: username,
        date: new Date(),
        role: "reader"
    });
};