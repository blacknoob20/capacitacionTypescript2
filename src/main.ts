import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
// * My imports
import { config } from './config/server';
import { UserRoutes } from './modules/user/routes/user.routes';


class Server {
    public app!: express.Application
    private host!: string
    private port!: number
    private paths = {
        user: '/user',
    }


    constructor() {
        this.app = express()
        this.middleware();
        this.routes();
        this.config();
    }

    routes() {
        this.app.use(this.paths.user, UserRoutes.routes)
    }

    middleware() {
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(morgan('tiny'))
        this.app.use(express.json()) // ! para enviar y recibir json a traes de express por la ruta
    }

    config() {
        this.port = config.server.PORT
        this.host = config.server.HOST
    }

    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Servidor levantado en ${this.host}:${this.port}`)
        })
    }
}

// ! Se levante el servidor aqui
const servidor = new Server();
servidor.listen();