import zipcodes, {ZipCode} from 'zipcodes';

//import zipcode, { near } from 'zipcodes-nearby';

export function zipcodeFilter(zipcode: string, radius: number): (ZipCode | string)[] {

    const radiusArray:(ZipCode | string)[] = zipcodes.radius(zipcode, radius)

    return radiusArray;
}