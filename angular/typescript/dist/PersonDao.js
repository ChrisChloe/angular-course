"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Person_1 = __importDefault(require("./Person"));
var PersonDao = /** @class */ (function () {
    function PersonDao() {
        this.nameTable = 'tb_person';
    }
    PersonDao.prototype.insert = function (object) {
        console.log('insert logic');
        return true;
    };
    PersonDao.prototype.update = function (object) {
        console.log('update logic');
        return true;
    };
    PersonDao.prototype.remove = function (id) {
        console.log('remove logic');
        return new Person_1.default('', '');
    };
    PersonDao.prototype.select = function (id) {
        console.log('select logic');
        return new Person_1.default('', '');
    };
    PersonDao.prototype.selectAll = function () {
        console.log('getAll logic');
        return [new Array];
    };
    return PersonDao;
}());
exports.PersonDao = PersonDao;
