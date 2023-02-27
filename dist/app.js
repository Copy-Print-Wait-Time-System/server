"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
//Routes
const stores_routes_1 = __importDefault(require("./routes/stores.routes"));
const store_routes_1 = __importDefault(require("./routes/store.routes"));
const queue_routes_1 = __importDefault(require("./routes/queue.routes"));
class App {
    constructor() {
        this.PORT = process.env.PORT;
        this.app = (0, express_1.default)();
        this.settings();
        this.routes();
    }
    routes() {
        this.app.use('/stores', stores_routes_1.default);
        this.app.use('/store', store_routes_1.default);
        this.app.use('/queue', queue_routes_1.default);
    }
    settings() {
        const corsOptions = {
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
        };
        this.app.use((0, cors_1.default)(corsOptions));
        //Reads and parse incoming requests
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.PORT);
        console.log("Server listening on port " + this.PORT);
    }
}
exports.App = App;
