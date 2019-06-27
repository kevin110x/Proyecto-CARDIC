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
            const { fech } = req.params;
            console.log(fech);
            const datos = yield database_1.default.query(`Select * from tbl_datos where Fecha_D LIKE ?`, ['%' + fech + '%']);
            ;
            if (datos.length > 0) {
                return res.json(datos);
            }
            else {
                res.json({
                    ok: false,
                    text: 'No contiene datos'
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('Insert into tbl_datos set ?, fecha_D=now()', [req.body]);
            res.json({ message: 'Dato Guardado' });
        });
    }
    sendAlert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('body', req.body);
            const accountSid = 'ACd65516ec994893596592b73f2a77b863';
            const authToken = 'd55e072b32b0a857a7d73b7e56451741';
            const client = require('twilio')(accountSid, authToken);
            client.messages
                .create({
                body: req.body.message,
                from: '+12094424289',
                to: req.body.to
            })
                .then((message) => {
                console.log(message.sid);
                res.json({ sid: message.sid });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_U } = req.params;
            yield database_1.default.query('delete from tbl_datos where Id_U = ?', [req.body]);
            res.json({ text: 'Dato eliminado correctamente.' });
        });
    }
}
exports.dataController = new DataController();
exports.default = exports.dataController;
