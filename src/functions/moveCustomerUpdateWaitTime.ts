import { connect } from "../database";

export function moveCustomerUpdateWaitTime(store_id: string, position1: number, position2: number) : void {

    const connection = connect();

    connection.query(`
    
    UPDATE queues
    SET estimatedWaitTime = (SELECT sum(customerTime) FROM queues WHERE position < ${position1} AND store = ${store_id})
    WHERE store = ${store_id} and position = ${position1} ;
    
    UPDATE queues
    SET estimatedWaitTime = (SELECT sum(customerTime) FROM queues WHERE position < ${position2} AND store = ${store_id})
    WHERE store = ${store_id} and position = ${position2};` , (err:any, res:any) => {

        console.log(`test`)
    });


}