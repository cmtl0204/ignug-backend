"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateStudentDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateStudentDto = /** @class */ (function () {
    function CreateStudentDto() {
    }
    CreateStudentDto._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return Number; }, minimum: 1 } };
    };
    __decorate([
        (0, class_validator_1.IsString)({ message: 'El campo debe ser de tipo string' })
    ], CreateStudentDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsNumber)({}, { message: 'El campo userId debe ser un numero' }),
        (0, class_validator_1.IsPositive)({ message: 'El campo userId debe ser un entero positivo' })
    ], CreateStudentDto.prototype, "userId");
    return CreateStudentDto;
}());
exports.CreateStudentDto = CreateStudentDto;
