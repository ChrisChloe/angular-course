"use strict";
var Car = /** @class */ (function () {
    function Car(model, doorNumber) {
        this.speed = 0;
        this.model = model;
        this.doorNumber = doorNumber;
    }
    Car.prototype.speeUp = function () {
        this.speed = this.speed + 10;
    };
    Car.prototype.stop = function () {
        this.speed = 0;
    };
    Car.prototype.currentSpeed = function () {
        return this.speed;
    };
    return Car;
}());
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
    return Dealership;
}());
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
var person = new Person('Bob', 'Honda');
console.log(person.sayFavouriteCar());
/*-- create cars --*/
var carA = new Car('Dodge', 2);
var carB = new Car('Veloster', 4);
var carC = new Car('Chevette', 3);
/* -- assemble list of cars from dealership */
var carList = [carA, carB, carC];
var dealership = new Dealership('Center of Town', carList);
/*-- show list of cars  --*/
/*-- buy car --*/
var client = new Person('Bob', 'Dodge');
dealership.showCarList().map(function (car) {
    if (car['model'] == client.sayFavouriteCar()) {
        //buys car
        client.buyCar(car);
    }
});
console.log(client.sayOwnedCar());
