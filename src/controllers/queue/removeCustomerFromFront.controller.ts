import { Request, Response } from "express";
import { connect } from "../../database";

export function removeCustomerFromFront (req: Request, res: Response){
    const connection = connect();

    const store_id = req.params.store_id
    const userID = req.body.userID;
    const dateTime = req.body.dateTime;

    connection.query(`SELECT *
    FROM queues Q
    JOIN customerJobs C ON Q.userID = C.userID
    JOIN customerJobsOptional CO ON C.userID = CO.userID
    WHERE Q.userID = ${userID};`, (err:any, result:any) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error with removing customer from the front.");
        }
        if (result[0] == null){
            return res.status(201).send("Error with removing customer from the front.");
        }

        const json = JSON.parse(JSON.stringify(result[0]));

        connection.query(`insert into jobHistory (completedDateTime, store, userID, firstName, lastName, job, copies, numPages,
            paperSize, paperType, fitPaper, color, sides, orientation, jobCollate, stapling, cutting, folding, holePunching,
            waferSealColor, waferSealSides, perforation, lamination, shrinkWrap, addFoamBoardMounting, removePages, slipsheet, trimToEdge, specialInstructions) 
            values ("${dateTime}", ${store_id}, ${userID}, "${json["firstName"]}", "${json["lastName"]}", "${json["job"]}", ${json["copies"]}, ${json["numPages"]}, "${json["paperSize"]}",
            "${json["paperType"]}", "${json["fitPaper"]}", "${json["color"]}", "${json["sides"]}", "${json["orientation"]}", "${json["jobCollate"]}", "${json["stapling"]}", "${json["cutting"]}",
            "${json["folding"]}", "${json["holePunching"]}", "${json["waferSealColor"]}", "${json["waferSealSides"]}", "${json["perforation"]}", "${json["lamination"]}", "${json["shrinkWrap"]}",
            "${json["addFoamBoardMounting"]}", "${json["removePages"]}", "${json["slipsheet"]}", "${json["trimToEdge"]}", "${json["specialInstructions"]}");`, (err:any, sql_response:any) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with removing customer from the front.");
                }

        });

        connection.query(`UPDATE queues
        SET estimatedWaitTime = estimatedWaitTime - (SELECT estimatedWaitTime FROM queues WHERE position = 1 AND store = ${store_id})
        WHERE store = ${store_id} AND position > 1; DELETE FROM queues WHERE position = 1 AND store = ${store_id}; 
        UPDATE queues SET position = position - 1 WHERE store = ${store_id} and position > 1;`, (err:any, sql_response:any) => {
            if (err) {
            console.error(err);
            return res.status(400).send("Error with removing customer from the front.");
            }

            return res.status(201).send('Customer in front removed from queue')
        });

    });

}