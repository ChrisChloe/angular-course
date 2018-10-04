"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vehicle = /** @class */ (function () {
    function Vehicle() {
        this.speed = 0;
    }
    Vehicle.prototype.speeUp = function () {
        this.speed = this.speed + 10;
    };
    Vehicle.prototype.stop = function () {
        this.speed = 0;
    };
    Vehicle.prototype.currentSpeed = function () {
        return this.speed;
    };
    return Vehicle;
}());
exports.default = Vehicle;
exports.anything = "Test";
