import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    location: { type: String },
    landmark: { type: String, default: "Virtual" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number },
    // isMultipleDays: { type: Boolean, required: true, default: false },
    totalCapacity: { type: Number, default: Math.max() },
    isFree: { type: Boolean, required: true, default: false },
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ticketsLeft: { type: Number, default: Math.max() },
    soldOut: { type: Boolean, default: false },
    ageRestriction: { type: Number, default: 0 },
    url: { type: String },
},
    {
        timestamps: true
    }
);

const Event = models.Event || model('Event', eventSchema);

export default Event;