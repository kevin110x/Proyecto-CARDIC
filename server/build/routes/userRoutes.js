"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../Controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.default.list);
        this.router.post('/user', userController_1.default.getOne);
        this.router.post('/', userController_1.default.create);
        this.router.put('/:Id_U', userController_1.default.update);
        this.router.delete('/:Id_U', userController_1.default.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
