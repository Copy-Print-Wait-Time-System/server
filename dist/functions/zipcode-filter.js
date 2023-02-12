"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipcodeFilter = void 0;
const zipcodes_1 = __importDefault(require("zipcodes"));
//import zipcode, { near } from 'zipcodes-nearby';
function zipcodeFilter(zipcode, radius) {
    const radiusArray = zipcodes_1.default.radius(zipcode, radius);
    console.log(radiusArray);
    return radiusArray;
}
exports.zipcodeFilter = zipcodeFilter;
