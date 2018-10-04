"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dao = /** @class */ (function () {
    function Dao() {
        this.nameTable = '';
    }
    Dao.prototype.insert = function (object) {
        console.log('insert logic');
        return true;
    };
    Dao.prototype.update = function (object) {
        console.log('update logic');
        return true;
    };
    Dao.prototype.remove = function (id) {
        console.log('remove logic');
        return Object();
    };
    Dao.prototype.select = function (id) {
        console.log('select logic');
        return Object();
    };
    Dao.prototype.selectAll = function () {
        console.log('getAll logic');
        return [Object()];
    };
    return Dao;
}());
exports.Dao = Dao;
