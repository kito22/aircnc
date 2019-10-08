import 'dotenv/config';

import Youch from 'youch';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';

import 'express-async-errors';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.app = http.Server(this.server);
    this.io = socketio(this.app);

    this.connectedUsers = {};

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;
    });

    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal error' });
    });
  }
}

export default new App().app;
