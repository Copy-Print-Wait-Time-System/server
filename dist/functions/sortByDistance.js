"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByDistance = void 0;
const zipcodes_1 = __importDefault(require("zipcodes"));
//import zipcode, { near } from 'zipcodes-nearby';
function sortByDistance(zipcode, zipcodeArray) {
    const sortedArray = [];
    for (let i = 0; i < zipcodeArray.length; i++) {
        var dist = zipcodes_1.default.distance(zipcode, zipcodeArray[i]); //In Miles
    }
    return sortedArray;
}
exports.sortByDistance = sortByDistance;
