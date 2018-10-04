"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { PersonDao } from './PersonDao';
//import { DealershipDao } from './DealershipDao'
//import { CarDao } from './CarDao';
//import { MotorcycleDao } from './MotorcycleDao';
var Dao_1 = require("./Dao");
var Dealership_1 = __importDefault(require("./Dealership"));
var Person_1 = __importDefault(require("./Person"));
var Car_1 = __importDefault(require("./Car"));
var Motorcycle_1 = __importDefault(require("./Motorcycle"));
//let dao : DealershipDao = new DealershipDao()
var dealership = new Dealership_1.default('', []);
//dao.insert(dealership)
//let dao2 : PersonDao = new PersonDao()
var person = new Person_1.default('', '');
//dao2.update(person)
//let dao3 : CarDao = new CarDao()
var car = new Car_1.default('', 3);
//dao3.selectAll()
//let dao4 : MotorcycleDao = new MotorcycleDao()
var motorcycle = new Motorcycle_1.default();
//dao4.select(2)
var dao5 = new Dao_1.Dao();
var dao6 = new Dao_1.Dao();
dao5.insert(dealership);
dao5.remove(4);
