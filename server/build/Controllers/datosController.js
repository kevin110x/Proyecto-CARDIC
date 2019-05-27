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
class DataController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query('Select * from tbl_datos');
            res.json(datos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const datos = yield database_1.default.query(`Select * from tbl_datos where Id_U = ${body.id} and Fecha_D = ${body.fecha}`);
            let data = datos[0];
            console.log('Dato', datos);
            if (datos.length > 0) {
                if (data)
                    return res.json({
                        ok: true,
                        user: datos[0]
                    });
            }
            else {
                res.json({
                    ok: false,
                    text: 'No existe tal Dato'
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('Insert into tbl_datos set ?', [req.body]);
            res.json({ message: 'Dato Guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_U } = req.params;
            const datos = yield database_1.default.query('delete from tbl_datos where Id_U = ?', [Id_U]);
            res.json({ text: 'Dato eliminado correctamente.' });
        });
    }
}
exports.dataController = new DataController();
exports.default = exports.dataController;
