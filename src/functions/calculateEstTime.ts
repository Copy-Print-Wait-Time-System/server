interface Data 
{
    fname: string,
    lname: string,
    job: string,
    numPages: number,
    copies: number,
    paperSize: string,
    paperType: string,
    fitPaper: string,
    color: string,
    sides: string,
    orientation: string,
    collate: string,
    stapling: string,
    cutting: string,
    folding: string,
    holePunching: string,
    waferSealColor: string,
    waferSealSides: string,
    perforation: string,
    lamination: string,
    shrinkWrap: string,
    addFoamBoardMounting: string,
    removePages: string,
    slipsheet: string,
    trimToEdge: string,
    specialInstructions: string
}

export function calculateEstTime(data:Data) : number {
    console.log(data);

    //For printer Xerox C70, it prints 70ppm for color and 75ppm for black & white
    const rate: number = (data.color == "full color" ? 70 : 75);

    //total number of pages
    var total_pages:number = data.numPages * data.copies;

    //verify if double sided or not
    var total_pages = (data.sides == "double sided" ? total_pages / 2 : total_pages);

    console.log("WAIT TIME CALCULATOR");
    console.log("total pages: " + total_pages);
    console.log("rate: " + rate);

    //calculate number of minutes to print the papers depending on total number of pages and the color of the printing
    var minutes = Math.ceil(total_pages / rate)

    console.log("minutes: " + minutes);

    //calculate minutes depending on size of the paper

    //letter 8.5 × 11 DEFAULT
    //minutes stay the same
    
    //legal 8.5 × 14 
    //legal is %24 bigger than letter
    if(data.paperSize == "legal"){
        minutes = Math.round(minutes * 1.24)
    }
    //ledger 17 × 11 
    //ledger is %67 bigger than letter
    else if(data.paperSize == "ledger"){
        minutes = Math.round(minutes * 1.67)
    }

    console.log("minutes after paper size: " + minutes);


    //if collated is needed, modify time, estimated 2 minutes more if collated is needed
    minutes =  (data.collate == "collated" ? minutes + 2 : minutes);

    console.log("minutes after collition: " + minutes);

    //if cutting is needed, add minutes to cut
    if(data.cutting != "none"){
        minutes = Math.round(minutes + 2)
    }

    //minutes after cut
    console.log("minutes after cut: " + minutes);

    //printer takes longer than copy
    minutes = (data.job == "copy" ? minutes + 2 : minutes + 3);

    console.log("final minutes: " + minutes);   

    return minutes;
}
