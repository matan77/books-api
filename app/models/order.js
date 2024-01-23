const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OrderItemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    amount: Number
});

const OrderSchema = new Schema({
    items: [OrderItemSchema],
    totalPrice: Number,
    date: { type: Date, default: Date.now }
});

const Order = model('Order', OrderSchema);
module.exports = Order;
