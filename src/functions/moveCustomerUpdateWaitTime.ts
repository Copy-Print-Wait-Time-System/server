import { connect } from "../database";

export function moveCustomerUpdateWaitTime(store_id: string, position1: number, position2: number) : void {

    const connection = connect();

    connection.query(`SELECT sum(customerTime) FROM queues WHERE store = ${store_id} AND position < ${position1};
    SELECT sum(customerTime) FROM queues WHERE store = ${store_id} AND position < ${position2};`, (err, result:any) => {
        
        const position1WaitTime = result[0][0]["sum(customerTime)"];
        const position2WaitTime = result[1][0]["sum(customerTime)"];
        
        connection.query(`
    
        UPDATE queues
        SET estimatedWaitTime = ${position1WaitTime}
        WHERE store = ${store_id} and position = ${position1} ;
        
        UPDATE queues
        SET estimatedWaitTime = ${position2WaitTime}
        WHERE store = ${store_id} and position = ${position2};` , (err:any, res:any) => {

        if(err){
            console.log(err);
        }

        connection.end();
        
    });



    });
    
}