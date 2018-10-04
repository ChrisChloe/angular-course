"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = __importDefault(require("./Car"));
var CarDao = /** @class */ (function () {
    function CarDao() {
        this.nameTable = 'tb_car';
    }
    CarDao.prototype.insert = function (object) {
        console.log('insert logic');
        return true;
    };
    CarDao.prototype.update = function (object) {
        console.log('update logic');
        return true;
    };
    CarDao.prototype.remove = function (id) {
        console.log('remove logic');
        return new Car_1.default('', 4);
    };
    CarDao.prototype.select = function (id) {
        console.log('select logic');
        return new Car_1.default('', 4);
    };
    CarDao.prototype.selectAll = function () {
        console.log('getAll logic');
        return [new Array];
    };
    return CarDao;
}());
exports.CarDao = CarDao;
