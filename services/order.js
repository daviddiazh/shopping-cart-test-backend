import OrderModel from "../models/order.js";

export class OrderService {
    constructor() {
        this.db = OrderModel;
    }

    async create (data) {
        return await this.db.create(data);
    }

    async findAll () {
        return await this.db.find();
    }

    async updateStatus (id, newStatus) {
        await this.db.findByIdAndUpdate(id, { status: newStatus });
    }
}