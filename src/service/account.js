import User from "../models/user";

export const updateLastLogin = async (userId) => {
    const user = await User.findOne(
        {_id: userId}
    );
    user.lastLogin = new Date();
    await user.save();
};