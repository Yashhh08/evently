"use server"

import User from "../models/user.model";
import { connectToDatabase } from "../dbconnection";
import Event from "../models/event.model";
import Order from "../models/order.model";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
export interface CreateUserParams {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName?: string;
    photo?: string;
}

export async function createUser(userData: CreateUserParams) {
    try {
        await connectToDatabase();

        const user = await User.create(userData);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: clerkId });

        if (!user) {
            throw new Error("User not found");
        }

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export interface UpdateUserParams {
    clerkId: string;
    userData: {
        username?: string;
        firstName?: string;
        lastName?: string;
        photo?: string;
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        await connectToDatabase();

        const user = await User.findOneAndUpdate({ clerkId: params.clerkId }, params.userData);

        if (!user) {
            throw new Error("User not found");
        }

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(clerkId: string) {
    try {

        await connectToDatabase();

        const user = await User.findOne({ clerkId: clerkId });

        if (!user) {
            throw new Error("User not found");
        }

        const userEvents = await Event.find({ organizer: user._id });

        if (userEvents) {
            await Event.deleteMany({ organizer: user._id });
        }

        const userOrders = await Order.find({ user: user._id });

        if (userOrders) {
            await Order.deleteMany({ user: user._id });
        }

        await User.findByIdAndDelete(user._id);

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function likeEvent(eventId: string, userId: string) {
    try {
        await connectToDatabase();

        const event = await Event.findById(eventId);

        const user = await User.findById(userId);

        if (!event) {
            throw new Error("Event not found");
        }

        if (!user) {
            throw new Error("Please login to like an event");
        }

        const alreadyLiked = await User.findOne({ _id: user._id, likedEvents: eventId });

        if (!alreadyLiked) {
            await User.findByIdAndUpdate(user._id, { $push: { likedEvents: eventId } });
        } else {
            await User.findByIdAndUpdate(user._id, { $pull: { likedEvents: eventId } });
        }

        revalidatePath(`/`);
        revalidatePath(`/likes`)

        if (alreadyLiked) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLikedEvents(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const response = await User.findById(userId).populate({
            path: "likedEvents",
            populate: [
                { path: "organizer", model: "User" },
                { path: "category", model: "Category" },
            ]
        });

        return JSON.parse(JSON.stringify(response.likedEvents));

    } catch (error) {
        console.log(error);
        throw error;
    }

}