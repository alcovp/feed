import Post from "../models/post";
import Comment from "../models/comment";
import moment from "moment";
import {addPagination} from "./common";

const pageSize = 5;

export const getPosts = async (troughId, page) => {
    const filter = {trough: troughId};
    const count = await Post.countDocuments(filter);
    const pages = Math.ceil(count / pageSize);
    return await Post.find(filter)
        .sort('-date')
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate('user', 'username')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username'
            }
        })
        .then(posts => posts.map(mapPost))
        .then(posts => addPagination(posts, pages, page))
        .catch(err => console.error(err));
};
const mapPost = (post) => {
    return {
        id: post._id,
        text: post.text,
        imageName: post.imageName,
        date: post.date ? moment(post.date).format('DD.MM.YYYY HH:mm') : "",
        user: post.user,
        likes: post.likes,
        dislikes: post.dislikes,
        comments: post.comments.map(mapComment)
    };
};
const mapComment = (comment) => {
    return {
        user: comment.user,
        text: comment.text,
        date: comment.date ? moment(comment.date).format('DD.MM.YYYY HH:mm') : ""
    };
};
export const createPost = async (userId, troughId, text, imageName) => {
    const post = new Post({
        text: text,
        imageName: imageName,
        date: new Date(),
        user: userId,
        trough: troughId,
        likes: [],
        dislikes: []
    });
    return await post.save();
};
export const createComment = async (userId, postId, text) => {
    const comment = new Comment({
        text: text,
        date: new Date(),
        user: userId
    });
    await comment.save();
    return Post.findOne(
        {_id: postId},
        function (err, post) {
            post.comments.push(comment._id);
            post.save();
        }
    );
};
export const likePost = async (postId, userId) => {
    const queryIfExists = {
        $pull: {likes: userId}
    };
    const queryIfNotExists = {
        $addToSet: {likes: userId},
        $pull: {dislikes: userId}
    };
    const exists = await Post.exists(
        {
            _id: postId,
            likes: {$elemMatch: {$eq: userId}}
        }
    );
    return Post.findOneAndUpdate(
        {_id: postId},
        exists ? queryIfExists : queryIfNotExists,
        {new: true}
    ).then(post => ({
        likes: post.likes.length,
        dislikes: post.dislikes.length
    }))
};
export const dislikePost = async (postId, userId) => {
    const queryIfExists = {
        $pull: {dislikes: userId}
    };
    const queryIfNotExists = {
        $addToSet: {dislikes: userId},
        $pull: {likes: userId}
    };
    const exists = await Post.exists(
        {
            _id: postId,
            dislikes: {$elemMatch: {$eq: userId}}
        }
    );
    return Post.findOneAndUpdate(
        {_id: postId},
        exists ? queryIfExists : queryIfNotExists,
        {new: true}
    ).then(post => ({
        likes: post.likes.length,
        dislikes: post.dislikes.length
    }))
};