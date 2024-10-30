class Sockets {
    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async( socket ) => {

            this.io.emit('get-orders', await new AuthService().findUsers()); //todo

            socket.on('update-order', async (name) => {
                socket.emit('get-orders', await new AuthService().findUsers(name)); //todo
            });

            socket.on('disconnect', async() => {
                console.log('disconnected')
            });
        });
    }
}

export default Sockets;