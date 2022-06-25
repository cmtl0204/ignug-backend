"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CatalogueEntity = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var product_entity_1 = require("../../../products/entities/product.entity");
var CatalogueEntity = /** @class */ (function () {
    function CatalogueEntity() {
    }
    CatalogueEntity._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: true, type: function () { return Number; } }, name: { required: true, type: function () { return String; } }, products: { required: true, type: function () { return [Object]; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], CatalogueEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('varchar', {
            name: 'name',
            length: 255,
            "default": 'SN',
            comment: 'Nombre del producto'
        })
    ], CatalogueEntity.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_entity_1.ProductEntity; }, function (product) { return product.type; })
    ], CatalogueEntity.prototype, "products");
    CatalogueEntity = __decorate([
        (0, typeorm_1.Entity)('catalogues')
    ], CatalogueEntity);
    return CatalogueEntity;
}());
exports.CatalogueEntity = CatalogueEntity;
