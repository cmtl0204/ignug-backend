"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DatabasesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("../config");
var API_KEY = '12345634';
var API_KEY_PROD = 'PROD1212121SA';
var DatabasesModule = /** @class */ (function () {
    function DatabasesModule() {
    }
    DatabasesModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_1["default"].KEY],
                    useFactory: function (configService) {
                        var _a = configService.database, username = _a.username, host = _a.host, database = _a.database, password = _a.password, port = _a.port;
                        return {
                            type: 'postgres',
                            synchronize: true,
                            autoLoadEntities: true,
                            host: host,
                            port: port,
                            username: username,
                            password: password,
                            database: database
                        };
                    }
                }),
            ],
            providers: [
                {
                    provide: 'API_KEY',
                    useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
                },
            ],
            exports: ['API_KEY', typeorm_1.TypeOrmModule]
        })
    ], DatabasesModule);
    return DatabasesModule;
}());
exports.DatabasesModule = DatabasesModule;
