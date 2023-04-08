"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreWaitTime = void 0;
const database_1 = require("../database");
function updateStoreWaitTime(store_id) {
    const connection = (0, database_1.connect)();
    connection.query(`UPDATE stores SET waitTime = (SELECT sum(estimatedTime)
    from queues
    where store = ${store_id}) 
    WHERE stores.store = ${store_id};`, (err, res) => {
        console.log(`Updated estimated time for store ${store_id}`);
    });
}
exports.updateStoreWaitTime = updateStoreWaitTime;
