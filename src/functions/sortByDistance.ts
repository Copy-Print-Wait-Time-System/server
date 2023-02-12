import zipcodes, {ZipCode} from 'zipcodes';

//import zipcode, { near } from 'zipcodes-nearby';

export function sortByDistance(zipcode: string, zipcodeArray: (string)[]) : (string)[] {

    const sortedArray: (string)[] = [];

    for(let i = 0; i < zipcodeArray.length; i++){
        var dist = zipcodes.distance(zipcode, zipcodeArray[i]); //In Miles

        
    }


    return sortedArray;
}