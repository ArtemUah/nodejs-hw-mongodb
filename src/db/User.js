import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // createdAt: {
    //     type: Date,
    // },
    // updatedAt: {
    //     type: Date
    // }
});

const User = model('user', userSchema);
export default User;
