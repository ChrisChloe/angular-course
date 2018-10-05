(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app/app.component.css":
/*!*******************************!*\
  !*** ./app/app.component.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn {\n  background-color: #990000;\n  font-weight: bolder;\n}\n"

/***/ }),

/***/ "./app/app.component.html":
/*!********************************!*\
  !*** ./app/app.component.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header> </app-header>\n\n<div *ngIf=\"gameInProgress; else endOfGame\" >\n    <app-dashboard (endGame)=\"endGame($event)\"> </app-dashboard>\n</div>\n<ng-template #endOfGame>\n  <div *ngIf=\"endType === 'defeat'; else endOfGameVictory\"  class=\"container\" style=\"margin-top: 50px\">\n      <div class=\"col\">\n          <h3 style=\"color: #990000; font-weight: bolder\">\n              Unfortunately, you lost.\n          </h3>\n          <button class=\"btn btn-primary\" (click)=\"restartGame()\">Restart</button>\n      </div>\n  </div>\n</ng-template>\n<ng-template #endOfGameVictory>\n  <div class=\"container\" style=\"margin-top: 50px\">\n    <div class=\"col\">\n        <h3 style=\"color: green; font-weight: bolder\">\n            Congratulations, you won.\n        </h3>\n        <button class=\"btn btn-primary\" (click)=\"restartGame()\">Restart</button>\n    </div>\n</div>\n</ng-template>\n"

/***/ }),

/***/ "./app/app.component.ts":
/*!******************************!*\
  !*** ./app/app.component.ts ***!
  \******************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.gameInProgress = true;
    }
    AppComponent.prototype.endGame = function (type) {
        this.gameInProgress = false;
        this.endType = type;
    };
    AppComponent.prototype.restartGame = function () {
        this.gameInProgress = true;
        this.endType = undefined;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app/app.module.ts":
/*!***************************!*\
  !*** ./app/app.module.ts ***!
  \***************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header/header.component */ "./app/header/header.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./app/dashboard/dashboard.component.ts");
/* harmony import */ var _attempts_attempts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./attempts/attempts.component */ "./app/attempts/attempts.component.ts");
/* harmony import */ var _progress_progress_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./progress/progress.component */ "./app/progress/progress.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"],
                _attempts_attempts_component__WEBPACK_IMPORTED_MODULE_5__["AttemptsComponent"],
                _progress_progress_component__WEBPACK_IMPORTED_MODULE_6__["ProgressComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./app/attempts/attempts.component.css":
/*!*********************************************!*\
  !*** ./app/attempts/attempts.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./app/attempts/attempts.component.html":
/*!**********************************************!*\
  !*** ./app/attempts/attempts.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<img *ngFor=\"let heart of hearts\" [src]=\"heart.showHeart()\"/>\n"

/***/ }),

/***/ "./app/attempts/attempts.component.ts":
/*!********************************************!*\
  !*** ./app/attempts/attempts.component.ts ***!
  \********************************************/
/*! exports provided: AttemptsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttemptsComponent", function() { return AttemptsComponent; });
/* harmony import */ var _shared_heart_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/heart.model */ "./app/shared/heart.model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AttemptsComponent = /** @class */ (function () {
    function AttemptsComponent() {
        this.emptyHeart = '/assets/empty-heart.png';
        this.fullHeart = '/assets/full-heart.png';
        this.hearts = [
            new _shared_heart_model__WEBPACK_IMPORTED_MODULE_0__["Heart"](true), new _shared_heart_model__WEBPACK_IMPORTED_MODULE_0__["Heart"](true), new _shared_heart_model__WEBPACK_IMPORTED_MODULE_0__["Heart"](true)
        ];
        console.log(this.hearts);
    }
    AttemptsComponent.prototype.ngOnChanges = function () {
        if (this.attempts !== this.hearts.length) {
            var index = this.hearts.length - this.attempts;
            this.hearts[index - 1].full = false;
        }
        console.log('attempts received from panel: ', this.attempts);
    };
    AttemptsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], AttemptsComponent.prototype, "attempts", void 0);
    AttemptsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-attempts',
            template: __webpack_require__(/*! ./attempts.component.html */ "./app/attempts/attempts.component.html"),
            styles: [__webpack_require__(/*! ./attempts.component.css */ "./app/attempts/attempts.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AttemptsComponent);
    return AttemptsComponent;
}());



/***/ }),

/***/ "./app/dashboard/dashboard.component.css":
/*!***********************************************!*\
  !*** ./app/dashboard/dashboard.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn {\n    border-color: #990000;\n    background-color: #990000;\n    font-weight: bolder;\n}\n.jumbotron {\n    margin-top:30px;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n"

/***/ }),

/***/ "./app/dashboard/dashboard.component.html":
/*!************************************************!*\
  !*** ./app/dashboard/dashboard.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"jumbotron\">\n      <div class=\"row\">\n          <div class=\"col sm-6\">\n              <app-progress [progress]=\"progress\"></app-progress>\n          </div>\n          <div class=\"col-sm-6\">\n              <div class=\"d-flex justify-content-end\">\n                <app-attempts [attempts]=\"attempts\"></app-attempts>\n              </div>\n          </div>\n      </div>\n\n      <div class=\"row\">\n          <div class=\"col\">\n              <h6>{{ instruction }}</h6>\n              <p>{{roundSentence.sentenceEng}}</p>\n\n              <div class=\"form-group\">\n                  <textarea\n                  class=\"form-control\"\n                  rows=\"3\"\n                  (input)=\"updateAnswer($event)\"\n                  [value]=\"answer\"\n                  ></textarea>\n              </div>\n          </div>\n      </div>\n      <div class=\"row\">\n          <div class=\"col\">\n              <div class=\"d-flex justify-content-end\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"checkAnswer()\">Verify</button>\n              </div>\n          </div>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./app/dashboard/dashboard.component.ts":
/*!**********************************************!*\
  !*** ./app/dashboard/dashboard.component.ts ***!
  \**********************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sentences_mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sentences-mock */ "./app/dashboard/sentences-mock.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
        this.sentences = _sentences_mock__WEBPACK_IMPORTED_MODULE_1__["SENTENCES"];
        this.instruction = 'Traduza a frase:';
        this.answer = '';
        this.round = 0;
        this.progress = 0;
        this.attempts = 3;
        this.endGame = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateRound();
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        console.log('Dashboard was destroyed');
    };
    DashboardComponent.prototype.updateAnswer = function (answer) {
        this.answer = (answer.target.value);
    };
    DashboardComponent.prototype.checkAnswer = function () {
        if (this.roundSentence.sentencePtBr === this.answer.toLowerCase()) {
            alert('Right Answer!');
            this.round++;
            this.progress = this.progress + (100 / this.sentences.length);
            if (this.round === 4) {
                this.endGame.emit('victory');
            }
            this.updateRound();
        }
        else {
            this.attempts--;
            if (this.attempts === -1) {
                this.endGame.emit('defeat');
            }
            this.answer = '';
        }
    };
    DashboardComponent.prototype.updateRound = function () {
        this.roundSentence = this.sentences[this.round];
        this.answer = '';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DashboardComponent.prototype, "endGame", void 0);
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./app/dashboard/sentences-mock.ts":
/*!*****************************************!*\
  !*** ./app/dashboard/sentences-mock.ts ***!
  \*****************************************/
/*! exports provided: SENTENCES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SENTENCES", function() { return SENTENCES; });
var SENTENCES = [
    { sentenceEng: 'I like to learn', sentencePtBr: 'eu gosto de aprender' },
    { sentenceEng: 'I watch tv', sentencePtBr: 'eu assisto tv' },
    { sentenceEng: 'I eat bread', sentencePtBr: 'eu como pão' },
    { sentenceEng: 'I do not like you', sentencePtBr: 'eu não gosto de você' }
];


/***/ }),

/***/ "./app/header/header.component.css":
/*!*****************************************!*\
  !*** ./app/header/header.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar {\n  background-color: #990000;\n  height: 70px;\n\n}\n.navbar-brand {\n  font-size: 27px;;\n  font-weight: bold;\n  color: white;\n}\n"

/***/ }),

/***/ "./app/header/header.component.html":
/*!******************************************!*\
  !*** ./app/header/header.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse bg-faded\">\n    <span class=\"navbar-brand mb-0 h1\">{{ title }}</span>\n  </nav>\n"

/***/ }),

/***/ "./app/header/header.component.ts":
/*!****************************************!*\
  !*** ./app/header/header.component.ts ***!
  \****************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.title = 'Learning English';
    }
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./app/header/header.component.css")]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./app/progress/progress.component.css":
/*!*********************************************!*\
  !*** ./app/progress/progress.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".progress {\n  background: #eef8da;\n  border : solid 1px #99ce28;\n}\n.progress-bar {\n  background: #99ce28;\n}\n"

/***/ }),

/***/ "./app/progress/progress.component.html":
/*!**********************************************!*\
  !*** ./app/progress/progress.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"progress\">\n    <div class=\"progress-bar w-{{ progress }}\"></div>\n  </div>\n"

/***/ }),

/***/ "./app/progress/progress.component.ts":
/*!********************************************!*\
  !*** ./app/progress/progress.component.ts ***!
  \********************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this.progress = 0;
    }
    ProgressComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProgressComponent.prototype, "progress", void 0);
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-progress',
            template: __webpack_require__(/*! ./progress.component.html */ "./app/progress/progress.component.html"),
            styles: [__webpack_require__(/*! ./progress.component.css */ "./app/progress/progress.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./app/shared/heart.model.ts":
/*!***********************************!*\
  !*** ./app/shared/heart.model.ts ***!
  \***********************************/
/*! exports provided: Heart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heart", function() { return Heart; });
var Heart = /** @class */ (function () {
    function Heart(full, urlFullHeart, urlEmptyHeart) {
        if (urlFullHeart === void 0) { urlFullHeart = '/assets/full-heart.png'; }
        if (urlEmptyHeart === void 0) { urlEmptyHeart = '/assets/empty-heart.png'; }
        this.full = full;
        this.urlFullHeart = urlFullHeart;
        this.urlEmptyHeart = urlEmptyHeart;
    }
    Heart.prototype.showHeart = function () {
        if (this.full) {
            return this.urlFullHeart;
        }
        else {
            return this.urlEmptyHeart;
        }
    };
    return Heart;
}());



/***/ }),

/***/ "./environments/environment.ts":
/*!*************************************!*\
  !*** ./environments/environment.ts ***!
  \*************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/david/Documents/angular-course/angular-course/angular/projects/app1/src/main.ts */"./main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map