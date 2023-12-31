import { th } from 'date-fns/locale';
"use server"

import { connectToDatabase } from "../dbconnection";
import Category from "../models/category.model";
import Event from "../models/event.model";
import Tag from "../models/tag.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export async function createEvent(eventData: any) {
    try {
        await connectToDatabase();

        let data = eventData;

        const category = await Category.findOne({ name: data.category });

        if (!category) {
            const newCategory = await Category.create({ name: data.category });
            data.category = newCategory._id;
        } else {
            data.category = category._id;
        }

        const tagsId: any = [];

        for (const tag of data.tags) {
            const tagExists = await Tag.findOne({ name: tag });

            if (!tagExists) {
                const newTag = await Tag.create({ name: tag });
                tagsId.push(newTag._id);
            } else {
                tagsId.push(tagExists._id);
            }
        };

        data.tags = tagsId;

        const event = await Event.create(data);

        event.tags.forEach(async (tag: any) => {
            const tagExists = await Tag.findById(tag);

            if (tagExists) {
                tagExists.events.push(event._id);
                await tagExists.save();
            }
            else {
                await Tag.create({ name: tag, events: [event._id] });
            }
        });

        revalidatePath("/");

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEvents() {
    try {
        await connectToDatabase();

        await User.find();

        const events = await Event.find()
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEventById(id: string) {
    try {
        await connectToDatabase();

        const event = await Event.findById(id)
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEventsByCategory(category: string) {
    try {
        await connectToDatabase();

        const events = await Event.find({ category: category })
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRelatedEvents(id: string) {
    try {
        await connectToDatabase();

        const event = await Event.findById(id);

        const events = await Event.find({ _id: { $nin: event._id }, category: event.category, tags: { $in: event.tags } })
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEventsByUserId(userId: string) {
    try {
        await connectToDatabase();

        const events = await Event.find({ organizer: userId })
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.log(error);
        throw error;
    }
}