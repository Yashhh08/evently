import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true },
},
    {
        timestamps: true
    }
);

const Category = models.Category || model('Category', categorySchema);

export default Category;
