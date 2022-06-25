'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.StudentEntity = void 0;
var openapi = require('@nestjs/swagger');
var typeorm_1 = require('typeorm');
var user_entity_1 = require('../../users/entities/user.entity');
var StudentEntity = /** @class */ (function () {
  function StudentEntity() {}
  StudentEntity._OPENAPI_METADATA_FACTORY = function () {
    return {
      id: {
        required: true,
        type: function () {
          return Number;
        },
      },
      name: {
        required: true,
        type: function () {
          return String;
        },
      },
      user: {
        required: true,
        type: function () {
          return Object;
        },
      },
    };
  };
  __decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)()],
    StudentEntity.prototype,
    'id',
  );
  __decorate(
    [
      (0, typeorm_1.Column)('varchar', {
        name: 'name',
        comment: 'Nombre del estudiante',
      }),
    ],
    StudentEntity.prototype,
    'name',
  );
  __decorate(
    [
      (0, typeorm_1.OneToOne)(
        function () {
          return user_entity_1.User;
        },
        function (user) {
          return user.student;
        },
        { nullable: false },
      ),
      (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    ],
    StudentEntity.prototype,
    'user',
  );
  StudentEntity = __decorate(
    [(0, typeorm_1.Entity)('students')],
    StudentEntity,
  );
  return StudentEntity;
})();
exports.StudentEntity = StudentEntity;
