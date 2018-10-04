import Car from './Car'
import Motorcycle from './Motorcycle'
import Dealership from './Dealership'

let car = new Car('veloster',3);
car.speeUp()
car.speeUp()

let motorcycle = new Motorcycle();
motorcycle.speeUp()
motorcycle.speeUp()

let dealership = new Dealership('',[]);

console.log(car)
console.log(motorcycle)
console.log(dealership.giveWorkingHour())