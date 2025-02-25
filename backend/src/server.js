import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import gameRouter from './routers/gameRouter.js';
import authRouter from './routers/authRouter.js';
import usersRouter from './routers/userRouter.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { playGame } from './socket/gameSocket.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
    const app = express();
    const server = createServer(app);

    const io = new Server(server, {
          cors: { origin: '*' },
        });

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser())


    app.use('/auth', authRouter);
    app.use('/room', gameRouter);
    app.use('/user', usersRouter);

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    playGame(io);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
};
