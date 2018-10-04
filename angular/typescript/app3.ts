import Car from './Car'
import Person from './Person'
import Dealership from './Dealership'

let person = new Person('Bob','Honda');
console.log(person.sayFavouriteCar())

/*-- create cars --*/

let carA = new Car('Dodge',2)
let carB = new Car('Veloster',4)
let carC = new Car('Chevette',3)

/* -- assemble list of cars from dealership */
let carList : Array<Car> = [carA, carB, carC]

let dealership = new Dealership('Center of Town',carList)

/*-- show list of cars  --*/
/*-- buy car --*/
let client = new Person('Bob','Dodge')

dealership.showCarList().map((car: Car) => {
    if(car['model'] == client.sayFavouriteCar()) {
        //buys car
        client.buyCar(car)

    }
})

console.log(client.sayOwnedCar())