import express, {Application} from "express";
require('dotenv').config();
const cors = require("cors");

//Routes
import StoresRouter from "./routes/stores.routes";
import StoreRouter from "./routes/store.routes";

export class App {
    PORT: any = process.env.PORT;
    app: Application;

    constructor(){
        this.app = express();
        this.routes();
    }
    
    routes(){
        this.app.use('/stores', StoresRouter);
        this.app.use('/store', StoreRouter)
    }

    settings(){
        
        this.app.use(express.json()) // for parsing application/json
        this.app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        
        const corsOptions = {
            origin: "*",
            credentials: true,
            optionSuccessStatus: 200,
        };

        this.app.use(cors(corsOptions));
    }

    listen(){
        this.app.listen(this.PORT);
        console.log("Server listening on port " + this.PORT);
    }
}