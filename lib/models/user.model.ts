import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    photo: { type: String },
    likedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
},
    {
        timestamps: true
    }
);

const User = models.User || model('User', userSchema);

export default User;
