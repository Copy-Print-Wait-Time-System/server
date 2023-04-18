import { connect } from "../database";

export function calculateTotalWaitTime(position: string, store: string) : Promise<number> {

    const connection = connect();
    
    return new Promise<number>((resolve, reject) => {
        connection.query(`SELECT sum(customerTime) FROM queues WHERE store = ${store} AND position < ${position};`, (err:any, res:any) => {
            var totalWaitTime = 0;
            totalWaitTime = res[0]['sum(customerTime)'];
            resolve(totalWaitTime);
        });
    })
};