

export function calculateEstTime(jobs: number, job_type: string) : number {

    if(job_type === 'copy') {
        return Math.ceil(jobs * 0.25);
    }
    else if(job_type === 'print') {
        return Math.ceil(jobs * 0.35);
    }
    //copy & print
    else{
        return Math.ceil(jobs * 0.3);
    }



}