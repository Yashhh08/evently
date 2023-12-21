import { Schema, model, models } from "mongoose";

const tagSchema = new Schema({
    name: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
},
    {
        timestamps: true
    }
);

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
