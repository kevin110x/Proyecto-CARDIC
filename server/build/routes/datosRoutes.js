"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datosController_1 = __importDefault(require("../Controllers/datosController"));
class DataRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', datosController_1.default.list);
        this.router.get('/:Id_U', datosController_1.default.getOne);
        this.router.post('/', datosController_1.default.create);
    }
}
const dataRoutes = new DataRoutes();
exports.default = dataRoutes.router;
