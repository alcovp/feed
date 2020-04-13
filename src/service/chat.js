import Message from "../models/message";
import moment from "moment";

const getMessages = async () => {
    return await Message.find()
        .populate('user', 'username')
        .then(messages => messages.map(mapMessage))
        .catch(err => console.error(err));
};
const mapMessage = (message) => {
    return {
        text: message.text,
        date: message.date ? moment(message.date).format('DD.MM.YYYY HH:mm') : "",
        user: message.user
    };
};
export const getHistory = async () => {
    return await getMessages()
        .then(messages => messages.map(msg => '[' + msg.date + '] ' + msg.user.username + ': ' + msg.text).join('\n'))
        .catch(err => console.error(err))
};
export const createMessage = async (text, userId) => {
    const message = new Message({
        text: text,
        date: new Date(),
        user: userId
    });
    return await message.save();
};