import express, {Application} from "express";
require('dotenv').config();
import cors from "cors";

//Routes
import StoresRouter from "./routes/stores.routes";
import StoreRouter from "./routes/store.routes";
import QueueRouter from "./routes/queue.routes";
import EmployeeRouter from "./routes/employee.routes";
export class App {
    PORT: any = process.env.PORT;
    app: Application;

    constructor(){
        this.app = express();
        this.settings();
        this.routes();
        
    }
    
    routes(){
        this.app.use('/stores', StoresRouter);
        this.app.use('/store', StoreRouter)
        this.app.use('/queue', QueueRouter)
        this.app.use('/employee', QueueRouter)
    }

    settings(){
        
        const corsOptions: cors.CorsOptions ={
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
              ],
              credentials: true,
              methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
              origin: '*',
              preflightContinue: false,       
          }
          
        this.app.use(cors(corsOptions)) 
          
        //Reads and parse incoming requests
        this.app.use(express.urlencoded({extended: true})); 
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.PORT);
        console.log("Server listening on port " + this.PORT);
    }
}