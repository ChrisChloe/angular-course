"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name, favouriteCar) {
        this.name = name;
        this.favouriteCar = favouriteCar;
    }
    Person.prototype.sayName = function () {
        return this.name;
    };
    Person.prototype.sayFavouriteCar = function () {
        return this.favouriteCar;
    };
    Person.prototype.buyCar = function (car) {
        this.car = car;
    };
    Person.prototype.sayOwnedCar = function () {
        return this.car;
    };
    return Person;
}());
exports.default = Person;
