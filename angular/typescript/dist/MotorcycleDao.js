"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Motorcycle_1 = __importDefault(require("./Motorcycle"));
var MotorcycleDao = /** @class */ (function () {
    function MotorcycleDao() {
        this.nameTable = 'tb_motorcycle';
    }
    MotorcycleDao.prototype.insert = function (object) {
        console.log('insert logic');
        return true;
    };
    MotorcycleDao.prototype.update = function (object) {
        console.log('update logic');
        return true;
    };
    MotorcycleDao.prototype.remove = function (id) {
        console.log('remove logic');
        return new Motorcycle_1.default();
    };
    MotorcycleDao.prototype.select = function (id) {
        console.log('select logic');
        return new Motorcycle_1.default();
    };
    MotorcycleDao.prototype.selectAll = function () {
        console.log('getAll logic');
        return [new Array];
    };
    return MotorcycleDao;
}());
exports.MotorcycleDao = MotorcycleDao;
