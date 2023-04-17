import { Request, Response } from "express";
import { connect } from "../../database";
import { calculateEstTime } from "../../functions/calculateEstTime";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";

export function updateJob (req: Request, res: Response){

    const connection = connect();
    const data = req.body;
    const store_id = req.params.store_id

        //Check if job is color or B&W
        var color = (data.color == "full color" ? true : false)

        // Calculate estimated time to complete job
        var estTime = calculateEstTime(data);

    // Updates all the fields for a user in the database
    connection.query(`UPDATE queues Q, customerJobs C, customerJobsOptional CO
    SET Q.firstName = "${data.fname}", Q.lastName = "${data.lname}", Q.estimatedWaitTime = ${estTime},
    C.job = "${data.job}", C.copies = ${data.copies}, C.numPages = ${data.numPages}, C.paperSize = "${data.paperSize}", C.paperType = "${data.paperType}", C.fitPaper = "${data.fitPaper}", C.color = "${data.color}", C.sides = "${data.sides}", C.orientation = "${data.orientation}", C.jobCollate = "${data.collate}",
    CO.stapling = "${data.stapling}", CO.cutting = "${data.cutting}", CO.folding = "${data.folding}", CO.holePunching = "${data.holePunching}", CO.waferSealColor = "${data.waferSealColor}", CO.waferSealSides = "${data.waferSealSides}", CO.perforation = "${data.perforation}", CO.lamination = "${data.lamination}", CO.shrinkWrap = "${data.shrinkWrap}", CO.addFoamBoardMounting = "${data.addFoamBoardMounting}", CO. removePages = "${data.removePages}", CO.slipsheet = "${data.slipsheet}", CO.trimToEdge = "${data.trimToEdge}", CO.specialInstructions = "${data.specialInstructions}"
    WHERE Q.userID = ${data.userID} AND Q.userID = C.userID AND Q.userID = CO.userID;`, (err:any, result:any) => {
        if (err){
            console.error(err);
            return res.status(400).send("Error updating values.");
        }

        updateStoreWaitTime(store_id);

        return res.status(201).send("Customer updated successfully.");
    });
    
}