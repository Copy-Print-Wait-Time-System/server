export function calculateEstTime(jobs: number, job_type: string, color: boolean) : number {

    //For printer Xerox C70, it prints 70ppm for color and 75ppm for black & white
    const rate: number = (color ? 70 : 75);

    if(job_type === 'copy') {
        return Math.ceil(jobs / rate) + 1;
    }
    else if(job_type === 'print') {
        return Math.ceil(jobs / rate) + 3;
    }
    //copy & print
    else{
        return Math.ceil(jobs * 0.3) + 2;
    }

}