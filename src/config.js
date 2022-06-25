"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('config', function () {
    return {
        database: {
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT, 10),
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USER,
            host: process.env.DB_HOST
        },
        apiKey: process.env.API_KEY
    };
});
