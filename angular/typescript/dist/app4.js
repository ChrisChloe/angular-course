"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = __importDefault(require("./Car"));
var Motorcycle_1 = __importDefault(require("./Motorcycle"));
var Dealership_1 = __importDefault(require("./Dealership"));
var car = new Car_1.default('veloster', 3);
car.speeUp();
car.speeUp();
var motorcycle = new Motorcycle_1.default();
motorcycle.speeUp();
motorcycle.speeUp();
var dealership = new Dealership_1.default('', []);
console.log(car);
console.log(motorcycle);
console.log(dealership.giveWorkingHour());
