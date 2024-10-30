import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';

import { dbConnection } from './database.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 9000;

        dbConnection();

        this.server = http.createServer( this.app );

        this.io = new SocketServer( this.server, {} );
    }

    async middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );

        const orderController = await import('../controllers/order.js');
        this.app.use( '/api/orders', orderController.default );
    }

    configureSockets() {
        //todo
    }

    execute() {
        this.middlewares();

        this.configureSockets();

        this.server.listen( this.port, () => {
            console.log('Server listen in port:', this.port );
        });
    }
}