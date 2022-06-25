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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
exports.__esModule = true;
exports.StudentsController = void 0;
var openapi = require('@nestjs/swagger');
var common_1 = require('@nestjs/common');
var StudentsController = /** @class */ (function () {
  function StudentsController(studentsService) {
    this.studentsService = studentsService;
  }
  StudentsController.prototype.create = function (createStudentDto) {
    return this.studentsService.create(createStudentDto);
  };
  StudentsController.prototype.findAll = function () {
    return this.studentsService.findAll();
  };
  StudentsController.prototype.findOne = function (id) {
    return this.studentsService.findOne(+id);
  };
  StudentsController.prototype.update = function (id, updateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  };
  StudentsController.prototype.remove = function (id) {
    return this.studentsService.remove(+id);
  };
  __decorate(
    [
      (0, common_1.Post)(),
      openapi.ApiResponse({
        status: 201,
        type: require('../entities/student.entity').StudentEntity,
      }),
      __param(0, (0, common_1.Body)()),
    ],
    StudentsController.prototype,
    'create',
  );
  __decorate(
    [(0, common_1.Get)(), openapi.ApiResponse({ status: 200, type: String })],
    StudentsController.prototype,
    'findAll',
  );
  __decorate(
    [
      (0, common_1.Get)(':id'),
      openapi.ApiResponse({ status: 200, type: String }),
      __param(0, (0, common_1.Param)('id')),
    ],
    StudentsController.prototype,
    'findOne',
  );
  __decorate(
    [
      (0, common_1.Patch)(':id'),
      openapi.ApiResponse({ status: 200, type: String }),
      __param(0, (0, common_1.Param)('id')),
      __param(1, (0, common_1.Body)()),
    ],
    StudentsController.prototype,
    'update',
  );
  __decorate(
    [
      (0, common_1.Delete)(':id'),
      openapi.ApiResponse({ status: 200, type: String }),
      __param(0, (0, common_1.Param)('id')),
    ],
    StudentsController.prototype,
    'remove',
  );
  StudentsController = __decorate(
    [(0, common_1.Controller)('students')],
    StudentsController,
  );
  return StudentsController;
})();
exports.StudentsController = StudentsController;
