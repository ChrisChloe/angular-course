//import { PersonDao } from './PersonDao';
//import { DealershipDao } from './DealershipDao'
//import { CarDao } from './CarDao';
//import { MotorcycleDao } from './MotorcycleDao';
import { Dao } from "./Dao";
import Dealership from './Dealership'
import Person from './Person';
import Car from './Car';
import Motorcycle from './Motorcycle';


//let dao : DealershipDao = new DealershipDao()
let dealership = new Dealership('',[])

//dao.insert(dealership)

//let dao2 : PersonDao = new PersonDao()
let person: Person = new Person('','')

//dao2.update(person)

//let dao3 : CarDao = new CarDao()
let car: Car = new Car('',3)

//dao3.selectAll()

//let dao4 : MotorcycleDao = new MotorcycleDao()
let motorcycle: Motorcycle = new Motorcycle()

//dao4.select(2)

let dao5: Dao<Dealership> = new Dao<Dealership>()
let dao6: Dao<Person> = new Dao<Person>()

dao5.insert(dealership)
dao5.remove(4)