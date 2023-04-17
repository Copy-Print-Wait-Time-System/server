import { connect } from "../database";

export function calculateTotalWaitTime(position: string, store: string) : number {

    const connection = connect();
    var totalWaitTime = 0;

    connection.query(`SELECT sum(customerTime) FROM queues WHERE store = ${store} AND position < ${position};`, (err:any, res:any) => {
        totalWaitTime = res[0]['sum(customerTime)'];
    });

    return totalWaitTime;
}