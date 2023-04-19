
import { connect } from "../database";

export function addJobInfo(data: any, userID: string) : Promise<string> {

    const connection = connect();
    

    return new Promise<string>((resolve, reject) => {
        connection.query(`insert into customerJobs (userID, job, copies, numPages, paperSize, paperType, fitPaper, color, sides, orientation, jobCollate)
                values (${userID}, "${data.job}", ${data.copies}, "${data.numPages}", "${data.paperSize}", "${data.paperType}", "${data.fitPaper}", "${data.color}", "${data.sides}", "${data.orientation}", "${data.collate}"); 
                INSERT INTO customerJobsOptional (userID, stapling, cutting, folding, holePunching, waferSealColor, waferSealSides, perforation, lamination, shrinkWrap, addFoamBoardMounting, removePages, slipsheet, trimToEdge, specialInstructions)
                VALUES (${userID}, "${data.stapling}", "${data.cutting}", "${data.folding}", "${data.holePunching}", "${data.waferSealColor}", "${data.waferSealSides}", "${data.perforation}", "${data.lamination}", "${data.shrinkWrap}", "${data.addFoamBoardMounting}", "${data.removePages}", "${data.slipsheet}", "${data.trimToEdge}", "${data.specialInstructions}");`, (err:any, result:any) => {

                    if (err) {
                        console.error(err);
                        resolve("Error with adding customer");
                    }
                    else{
                        resolve('')
                    }
                    
                });
    });
};



