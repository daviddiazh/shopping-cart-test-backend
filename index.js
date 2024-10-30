import 'dotenv/config'
import { Server } from './modules/server.js';

const server = new Server();

server.execute();