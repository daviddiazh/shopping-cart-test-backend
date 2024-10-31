import { OrderService } from "../services/order.js";

class Sockets {
    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async( socket ) => {

            const service = new OrderService();

            this.io.emit('get-orders', await service.findAll());

            socket.on('update-order', async (data) => {
                await service.updateStatus(data?._id, data?.newStatus)
                this.io.emit('get-orders', await service.findAll());
            });
 
            socket.on('create-order', async (data) => {
                const resp = await service.create({ products: data, status: 'order-received' })
                this.io.emit('get-orders', await service.findAll());

                const intervalId = setInterval(async () => {
                    await service.updateStatus(resp?._id, 'preparing')
                    this.io.emit('get-orders', await service.findAll());

                    clearInterval(intervalId);
                }, 4000);
            });

            socket.on('disconnect', async() => {
                console.log('disconnected')
            });
        });
    }
}

export default Sockets;