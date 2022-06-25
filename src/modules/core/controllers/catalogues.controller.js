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
exports.CataloguesController = void 0;
var openapi = require('@nestjs/swagger');
var common_1 = require('@nestjs/common');
var CataloguesController = /** @class */ (function () {
  function CataloguesController(cataloguesService) {
    this.cataloguesService = cataloguesService;
  }
  CataloguesController.prototype.create = function (createCatalogueDto) {
    return this.cataloguesService.create(createCatalogueDto);
  };
  CataloguesController.prototype.findAll = function () {
    return this.cataloguesService.findAll();
  };
  CataloguesController.prototype.findOne = function (id) {
    return this.cataloguesService.findOne(+id);
  };
  CataloguesController.prototype.update = function (id, updateCatalogueDto) {
    return this.cataloguesService.update(+id, updateCatalogueDto);
  };
  CataloguesController.prototype.remove = function (id) {
    return this.cataloguesService.remove(+id);
  };
  __decorate(
    [
      (0, common_1.Post)(),
      openapi.ApiResponse({
        status: 201,
        type: require('../entities/catalogue.entity').CatalogueEntity,
      }),
      __param(0, (0, common_1.Body)()),
    ],
    CataloguesController.prototype,
    'create',
  );
  __decorate(
    [
      (0, common_1.Get)(),
      openapi.ApiResponse({
        status: 200,
        type: [require('../entities/catalogue.entity').CatalogueEntity],
      }),
    ],
    CataloguesController.prototype,
    'findAll',
  );
  __decorate(
    [
      (0, common_1.Get)(':id'),
      openapi.ApiResponse({
        status: 200,
        type: require('../entities/catalogue.entity').CatalogueEntity,
      }),
      __param(0, (0, common_1.Param)('id')),
    ],
    CataloguesController.prototype,
    'findOne',
  );
  __decorate(
    [
      (0, common_1.Patch)(':id'),
      openapi.ApiResponse({
        status: 200,
        type: require('../entities/catalogue.entity').CatalogueEntity,
      }),
      __param(0, (0, common_1.Param)('id')),
      __param(1, (0, common_1.Body)()),
    ],
    CataloguesController.prototype,
    'update',
  );
  __decorate(
    [
      (0, common_1.Delete)(':id'),
      openapi.ApiResponse({ status: 200 }),
      __param(0, (0, common_1.Param)('id')),
    ],
    CataloguesController.prototype,
    'remove',
  );
  CataloguesController = __decorate(
    [(0, common_1.Controller)('catalogues')],
    CataloguesController,
  );
  return CataloguesController;
})();
exports.CataloguesController = CataloguesController;
