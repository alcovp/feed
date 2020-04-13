import Trough from "../models/trough";
import moment from "moment";

export const getTrough = async (troughId) => {
    return await Trough.findOne({_id: troughId})
        .select('_id name imageName')
        .then(mapTroughBriefly)
        .catch(err => console.error(err));
};
const mapTroughBriefly = (trough) => {
    return {
        id: trough._id,
        name: trough.name,
        imageName: trough.imageName
    }
};
export const getTroughs = async () => {
    return await Trough.find()
        .populate('user', 'username')
        .then(troughs => troughs.map(mapTrough))
        .catch(err => console.error(err));
};
const mapTrough = (trough) => {
    return {
        id: trough._id,
        name: trough.name,
        description: trough.description,
        imageName: trough.imageName,
        date: trough.date ? moment(trough.date).format('DD.MM.YYYY HH:mm') : "",
        user: trough.user,
        writers: trough.writers,
        readers: trough.readers,
        posts: trough.posts,
    };
};
export const createTrough = async (userId, name, description, imageName) => {
    const trough = new Trough({
        name: name,
        description: description,
        imageName: imageName,
        date: new Date(),
        user: userId
    });
    return await trough.save();
};