import express, {Application} from "express";
require('dotenv').config();

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

    listen(){
        this.app.listen(this.PORT);
        console.log("Server listening on port " + this.PORT);
    }
}