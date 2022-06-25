"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("@nestjs/axios");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var databases_module_1 = require("./databases/databases.module");
var config_1 = require("@nestjs/config");
var enviroments_1 = require("./enviroments");
var config_2 = require("./config");
var users_module_1 = require("./modules/users/users.module");
var Joi = require("joi");
var catalogues_module_1 = require("./modules/core/catalogues/catalogues.module");
var students_module_1 = require("./modules/core/students/students.module");
var core_module_1 = require("./modules/core/core.module");
var auth_module_1 = require("./modules/auth/auth.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: enviroments_1.enviroments[process.env.NODE_ENV] || '.env',
                    isGlobal: true,
                    load: [config_2["default"]],
                    validationSchema: Joi.object({
                        DB_NAME: Joi.string().required(),
                        DB_PORT: Joi.number().required()
                    })
                }),
                axios_1.HttpModule,
                databases_module_1.DatabasesModule,
                users_module_1.UsersModule,
                catalogues_module_1.CataloguesModule,
                students_module_1.StudentsModule,
                core_module_1.CoreModule,
                auth_module_1.AuthModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
