"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var student_entity_1 = require("../../core/students/entities/student.entity");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    UserEntity._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: true, type: function () { return Number; } }, name: { required: true, type: function () { return String; } }, lastname: { required: true, type: function () { return String; } }, age: { required: true, type: function () { return Number; } }, birthdate: { required: true, type: function () { return Date; } }, married: { required: true, type: function () { return Boolean; } }, student: { required: true, type: function () { return require("../../core/students/entities/student.entity").StudentEntity; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], UserEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 })
    ], UserEntity.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 })
    ], UserEntity.prototype, "lastname");
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' })
    ], UserEntity.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' })
    ], UserEntity.prototype, "birthdate");
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean' })
    ], UserEntity.prototype, "married");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return student_entity_1.StudentEntity; }, function (student) { return student.user; })
    ], UserEntity.prototype, "student");
    UserEntity = __decorate([
        (0, typeorm_1.Entity)('users')
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
