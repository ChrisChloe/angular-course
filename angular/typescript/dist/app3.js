"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = __importDefault(require("./Car"));
var Person_1 = __importDefault(require("./Person"));
var Dealership_1 = __importDefault(require("./Dealership"));
var person = new Person_1.default('Bob', 'Honda');
console.log(person.sayFavouriteCar());
/*-- create cars --*/
var carA = new Car_1.default('Dodge', 2);
var carB = new Car_1.default('Veloster', 4);
var carC = new Car_1.default('Chevette', 3);
/* -- assemble list of cars from dealership */
var carList = [carA, carB, carC];
var dealership = new Dealership_1.default('Center of Town', carList);
/*-- show list of cars  --*/
/*-- buy car --*/
var client = new Person_1.default('Bob', 'Dodge');
dealership.showCarList().map(function (car) {
    if (car['model'] == client.sayFavouriteCar()) {
        //buys car
        client.buyCar(car);
    }
});
console.log(client.sayOwnedCar());
