"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
var body_parser_1 = __importDefault(require("body-parser"));
var JuankUnderAgua = body_parser_1.default.json();
var db = __importStar(require("./db-conection"));
//EXAMEN
app.get('/voluntario/:numero', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var random;
    return __generator(this, function (_a) {
        console.log('\x1b[90m', 'Petición recibida al endpoint GET /voluntario/:numero');
        try {
            console.log('\x1b[90m', "Generando numero");
            random = Math.floor(Math.random() * Number(req.params.numero) + 1);
            console.log('\x1b[90m', "Numero generado");
            console.log('\x1b[90m', random);
            res.json({ random: random });
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        return [2 /*return*/];
    });
}); });
app.get('/asistencia/:numero', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var alumno, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('\x1b[33m%s\x1b[0m', "Petición recibida al endpoint GET /asistencia/:numero");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                console.log('\x1b[33m%s\x1b[0m', "Recogiendo información del usuario");
                return [4 /*yield*/, db.query("SELECT * FROM asistencia WHERE id = " + req.params.numero)];
            case 2:
                alumno = _a.sent();
                if (!(alumno.rows.length > 0)) return [3 /*break*/, 5];
                console.log('\x1b[33m%s\x1b[0m', "Updateando información usuario");
                return [4 /*yield*/, db.query("UPDATE asistencia SET estado = 'presente' WHERE id = " + req.params.numero)];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.query("SELECT * FROM asistencia WHERE id = " + req.params.numero)];
            case 4:
                alumno = _a.sent();
                res.json({ alumno: alumno.rows[0].alumno, estado: alumno.rows[0].estado });
                return [3 /*break*/, 6];
            case 5:
                console.log('\x1b[33m%s\x1b[0m', "no existe id del alumno");
                res.send("No existe ese id de alumno");
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/notas", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                console.log('\x1b[36m%s\x1b[0m', 'Petición recibida al endpoint GET /notas');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log('\x1b[36m%s\x1b[0m', 'eliminandolo...'); //cyan
                //No hace falta hacer if porque aunque no exista no va a dar error
                return [4 /*yield*/, db.query("DELETE FROM notas WHERE id = '" + req.body.id + "'")];
            case 2:
                //No hace falta hacer if porque aunque no exista no va a dar error
                _a.sent();
                console.log('\x1b[36m%s\x1b[0m', 'creando nota del usuario'); //cyan
                return [4 /*yield*/, db.query("INSERT INTO notas (id, curso, asignatura, calificacion) VALUES ('" + req.body.id + "', '" + req.body.curso + "', '" + req.body.asignatura + "', " + req.body.calificacion + ");")];
            case 3:
                _a.sent();
                console.log('\x1b[36m%s\x1b[0m', 'enviando información del usuario.'); //cyan
                res.json("Usuario creado");
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port + "\n    \n    ENDPOINTS:\n    -POST /add_card\n    -GET /tiradas/:user\n    -GET /cartas/:user\n    "); });
