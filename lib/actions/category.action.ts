"use server"

import { connectToDatabase } from "../dbconnection";
import Category from "../models/category.model";

export async function getCategoryByName(searchParams: string) {
    try {
        await connectToDatabase();

        const category = await Category.findOne({ name: { $regex: new RegExp(searchParams, 'i') } });

        if (!category) {
            return null;
        }

        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        console.log(error);
        throw error;
    }
}