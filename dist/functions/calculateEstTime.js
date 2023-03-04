"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEstTime = void 0;
//import zipcode, { near } from 'zipcodes-nearby';
function calculateEstTime(jobs, job_type) {
    if (job_type === 'copy') {
        return jobs * 0.25;
    }
    else if (job_type === 'print') {
        return jobs * 0.35;
    }
    //copy & print
    else {
        return jobs * 0.3;
    }
}
exports.calculateEstTime = calculateEstTime;
