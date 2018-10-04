"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dealership_1 = __importDefault(require("./Dealership"));
var DealershipDao = /** @class */ (function () {
    function DealershipDao() {
        this.nameTable = 'tb_dealership';
    }
    DealershipDao.prototype.insert = function (object) {
        console.log('insert logic');
        return true;
    };
    DealershipDao.prototype.update = function (object) {
        console.log('update logic');
        return true;
    };
    DealershipDao.prototype.remove = function (id) {
        console.log('remove logic');
        return new Dealership_1.default('', []);
    };
    DealershipDao.prototype.select = function (id) {
        console.log('select logic');
        return new Dealership_1.default('', []);
    };
    DealershipDao.prototype.selectAll = function () {
        console.log('getAll logic');
        return [new Array];
    };
    return DealershipDao;
}());
exports.DealershipDao = DealershipDao;
