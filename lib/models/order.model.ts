import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    stripeId: { type: String, required: true },
    totalTickets: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
},
    {
        timestamps: true
    }
);

const Order = models.Order || model('Order', orderSchema);

export default Order;