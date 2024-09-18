import express  from 'express'
import { config } from './config/server';
import helmet from 'helmet';
import cors from 'cors';


class Server {
    public app!: express.Application
    private host!: string
    private port!: number
    

    constructor(){
        this.app = express()
        this.routes();
        this.middleware();
        this.config()       
    }

    routes(){
    }

    middleware(){
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(express.json()) // ! para enviar y recibir json a traes de express por la ruta
    }

    config(){
        this.port = config.server.PORT
        this.host = config.server.HOST 
    }

    listen(){
        this.app.listen(this.port, this.host,() =>{
            console.log(`Servidor levantado en ${this.host}:${this.port}`)
        })
    }
}

// ! Se levante el servidor aqui
const servidor = new Server()
servidor.listen()