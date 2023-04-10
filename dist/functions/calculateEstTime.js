"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEstTime = void 0;
function calculateEstTime(data) {
    console.log(data);
    //For printer Xerox C70, it prints 70ppm for color and 75ppm for black & white
    const rate = (data.color == "full color" ? 70 : 75);
    //total number of pages
    var total_pages = data.numPages * data.copies;
    //verify if double sided or not
    var total_pages = (data.sides == "double sided" ? total_pages / 2 : total_pages);
    console.log(total_pages);
    //calculate number of minutes to print the papers depending on total number of pages and the color of the printing
    var minutes = Math.ceil(total_pages / rate);
    //calculate minutes depending on size of the paper
    //letter 8.5 × 11 DEFAULT
    //minutes stay the same
    //legal 8.5 × 14 
    //legal is %24 bigger than letter
    if (data.paperSize == "legal") {
        minutes = Math.round(minutes * 1.24);
    }
    //ledger 17 × 11 
    //ledger is %67 bigger than letter
    else if (data.paperSize == "ledger") {
        minutes = Math.round(minutes * 1.67);
    }
    //if collated is needed, modify time, estimated 2 minutes more if collated is needed
    minutes = (data.collate == "collate" ? minutes + 2 : minutes);
    //if cutting is needed, add minutes to cut
    if (data.cutting != "cut") {
        minutes = Math.round(minutes + 2);
    }
    //printer takes longer than copy
    if (data.job === 'copy') {
        return minutes + 2;
    }
    //print job
    else {
        return minutes + 3;
    }
}
exports.calculateEstTime = calculateEstTime;
