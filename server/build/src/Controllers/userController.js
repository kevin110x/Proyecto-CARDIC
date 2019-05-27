"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('Select * from tbl_usuarios');
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_U } = req.params;
            const usuarios = yield database_1.default.query('Select * from tbl_usuarios where Id_U = ?', [Id_U]);
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            else {
                res.json({ text: 'No existe tal usuario' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('Insert into tbl_usuarios set ?', [req.body]);
            res.json({ message: 'Usuario Guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_U } = req.params;
            const usuarios = yield database_1.default.query('delete from tbl_usuarios where Id_U = ?', [Id_U]);
            res.json({ text: 'Usuario eliminado correctamente.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_U } = req.params;
            const usuarios = yield database_1.default.query('update tbl_usuarios set ? where Id_U = ?', [req.body, Id_U]);
            if (usuarios.length > 0) {
                res.json({ text: 'No existe tal usuario' });
            }
            else {
                res.json({ text: 'Usuario actualizado correctamente' });
            }
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;
