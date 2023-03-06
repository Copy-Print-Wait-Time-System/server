import { connect } from "../database";

export function updateStoreWaitTime(store_id: string) : void {

    const connection = connect();

    connection.query(`UPDATE stores SET wait_time = (SELECT sum(estimatedTime)
    from queues
    where store = ${store_id}) 
    WHERE stores.store = ${store_id};`, (err:any, res:any) => {
        console.log(`Updated estimated time for store ${store_id}`)
    });

}