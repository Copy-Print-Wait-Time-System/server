"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEstTime = void 0;
function calculateEstTime(jobs, job_type) {
    if (job_type === 'copy') {
        return Math.ceil(jobs * 0.25);
    }
    else if (job_type === 'print') {
        return Math.ceil(jobs * 0.35);
    }
    //copy & print
    else {
        return Math.ceil(jobs * 0.3);
    }
}
exports.calculateEstTime = calculateEstTime;
