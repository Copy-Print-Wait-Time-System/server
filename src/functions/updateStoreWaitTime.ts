import { connect } from "../database";

export function updateStoreWaitTime(store_id: string) : Promise<string> {

    const connection = connect();

    return new Promise<string>((resolve, reject) => {
        connection.query(`UPDATE stores SET waitTime = (SELECT max(estimatedWaitTime)
        FROM queues
        WHERE store = ${store_id}) 
        WHERE stores.store = ${store_id};`, (err:any, res:any) => {
            resolve(`Updated estimated time for store ${store_id}`)
        });
    })
    

}