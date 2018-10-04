"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dealership = /** @class */ (function () {
    function Dealership(address, carList) {
        this.address = address;
        this.carList = carList;
    }
    Dealership.prototype.giveAddress = function () {
        return this.address;
    };
    Dealership.prototype.showCarList = function () {
        return this.carList;
    };
    Dealership.prototype.giveWorkingHour = function () {
        return 'From Monday to Friday, from 8:00 to 18:00 and Saturdays, from 08:00 to 12:00';
    };
    return Dealership;
}());
exports.default = Dealership;
