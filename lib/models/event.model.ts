import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    landmark: { type: String },
    isOnline: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    isFree: { type: Boolean, required: true },
    category: { type: String, ref: 'Category', required: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalCapacity: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    ageRestriction: { type: Number, default: 0 },
    url: { type: String },
    isMultipleDays: { type: Boolean, required: true },
    dailyCapacity: { type: Number },
    dailyAvailableTickets: { type: Number },
},
    {
        timestamps: true
    }
);

const Event = models.Event || model('Event', eventSchema);

export default Event;