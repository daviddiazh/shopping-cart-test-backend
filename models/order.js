import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      category: { type: String },
      image: { type: String },
      rating: {
        rate: { type: Number },
        count: { type: Number }
      }
    }
  ],
  status: { type: String, required: true, trim: true, enum: ["order-received", "preparing", "walking", "done"] },
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;