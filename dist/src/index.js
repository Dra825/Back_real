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
app.get('/tiempo_restar/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tiempo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db.query("SELECT * FROM Tiempo_Pociones WHERE usuario_id = '" + req.params.user + "' AND item_id = 'Pocion_Pro' ")];
            case 2:
                tiempo = _a.sent();
                if (!(tiempo.rows[0].tiempo > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, db.query("UPDATE Tiempo_Pociones SET tiempo = tiempo -1 WHERE item_id ='Pocion_Pro' AND usuario_id = '" + req.params.user + "' ")];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.query("SELECT * FROM Tiempo_Pociones WHERE usuario_id = '" + req.params.user + "' AND item_id = 'Pocion_Pro' ")];
            case 4:
                tiempo = _a.sent();
                _a.label = 5;
            case 5:
                console.log(req.params.carta);
                res.json(tiempo.rows[0]);
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.get('/tiempo/:user/:item', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM Tiempo_Pociones WHERE usuario_id = '" + req.params.user + "' AND item_id = '" + req.params.item + "' ")];
            case 2:
                item = _a.sent();
                console.log(req.params.carta);
                res.json(item.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/tomar", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Data, actualizacion, comprobacion, comprobacion2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                Data = {
                    user: req.body.user,
                    item: req.body.item,
                };
                console.log("cositas", Data);
                if (!(Data.item !== "Brazalete")) return [3 /*break*/, 12];
                return [4 /*yield*/, db.query("UPDATE Usuarios_Items SET cantidad = cantidad -1 WHERE item_id = '" + Data.item + "'AND usuario_id = '" + Data.user + "' ")];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios_Items WHERE usuario_id = '" + Data.user + "' AND item_id = '" + Data.item + "'")];
            case 3:
                actualizacion = _a.sent();
                if (!(actualizacion.rows[0].cantidad == 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, db.query("DELETE FROM Usuarios_Items WHERE usuario_id= '" + Data.user + "' AND item_id = '" + Data.item + "'")];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, db.query("SELECT * FROM Tiempo_Pociones WHERE usuario_id = '" + Data.user + "' AND item_id = '" + Data.item + "'")];
            case 6:
                comprobacion = _a.sent();
                if (!(comprobacion.rows.length > 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, db.query("UPDATE Tiempo_Pociones SET tiempo = tiempo +60 WHERE item_id = '" + Data.item + "' AND usuario_id = '" + Data.user + "'")];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, db.query("INSERT INTO Tiempo_Pociones (usuario_id, tiempo, item_id) VALUES ('" + Data.user + "', 60, '" + Data.item + "' )")];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [4 /*yield*/, db.query("SELECT * FROM Tiempo_Pociones WHERE usuario_id = '" + Data.user + "' AND item_id = '" + Data.item + "'")];
            case 11:
                comprobacion2 = _a.sent();
                res.json(comprobacion2.rows[0]);
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                err_3 = _a.sent();
                console.log(err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
app.get('/cargar_items/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios_Items WHERE usuario_id = '" + req.params.user + "' ")];
            case 2:
                item = _a.sent();
                console.log(req.params.carta);
                res.json(item.rows);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/add_item", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Data, comprobacion, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                Data = {
                    user: req.body.user,
                    item: req.body.item,
                    gemas: req.body.gemas
                };
                console.log("cositas", Data);
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios_Items WHERE usuario_id = '" + Data.user + "' AND item_id = '" + Data.item + "'")
                    // 2. Actualizar Items
                ];
            case 2:
                comprobacion = _a.sent();
                // 2. Actualizar Items
                console.log("Actualizando Items Usuario");
                if (!(comprobacion.rows.length > 0)) return [3 /*break*/, 4];
                // Update Items
                return [4 /*yield*/, db.query("UPDATE Usuarios_Items SET cantidad = " + (comprobacion.rows[0].cantidad + 1) + " WHERE item_id = '" + Data.item + "' ")];
            case 3:
                // Update Items
                _a.sent();
                console.log("Items de usuario actualizadas");
                return [3 /*break*/, 6];
            case 4:
                console.log("Creando nuevo item: " + Data.user + ", '" + Data.item + "'");
                return [4 /*yield*/, db.query("INSERT INTO Usuarios_Items (usuario_id, item_id, cantidad) VALUES ('" + Data.user + "', '" + Data.item + "', 1)")];
            case 5:
                _a.sent();
                console.log("Nuevo item creado");
                _a.label = 6;
            case 6: return [4 /*yield*/, db.query("UPDATE Usuarios SET gemas = gemas - " + Data.gemas + " WHERE id = '" + Data.user + "' ")];
            case 7:
                _a.sent();
                res.json("Item añadido a tu inventario con exito");
                return [3 /*break*/, 9];
            case 8:
                err_5 = _a.sent();
                console.log(err_5);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.post("/gemas", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Peticion recibida al endpoint -POST /guardar_equipo");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log(req.body.equipo);
                return [4 /*yield*/, db.query("UPDATE Usuarios SET gemas = gemas + " + req.body.gemas + "  WHERE id = '" + req.body.user + "'")];
            case 2:
                _a.sent();
                console.log("GEMAS ACTUALIZADAS :D");
                res.json("TODO ACTUALIZADO UwU");
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                console.log(err_6);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/equipo_cargar/:carta1/:carta2/:carta3/:carta4/:carta5', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cartas, carta1, carta2, carta3, carta4, carta5, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                cartas = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                console.log(req.params.carta);
                if (!req.params.carta1) return [3 /*break*/, 3];
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta1 + "'")];
            case 2:
                carta1 = _a.sent();
                cartas.push(carta1.rows[0]);
                _a.label = 3;
            case 3:
                if (!req.params.carta2) return [3 /*break*/, 5];
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta2 + "'")];
            case 4:
                carta2 = _a.sent();
                cartas.push(carta2.rows[0]);
                _a.label = 5;
            case 5:
                if (!req.params.carta3) return [3 /*break*/, 7];
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta3 + "'")];
            case 6:
                carta3 = _a.sent();
                cartas.push(carta3.rows[0]);
                _a.label = 7;
            case 7:
                if (!req.params.carta4) return [3 /*break*/, 9];
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta4 + "'")];
            case 8:
                carta4 = _a.sent();
                cartas.push(carta4.rows[0]);
                _a.label = 9;
            case 9:
                if (!req.params.carta5) return [3 /*break*/, 11];
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta5 + "'")];
            case 10:
                carta5 = _a.sent();
                cartas.push(carta5.rows[0]);
                _a.label = 11;
            case 11:
                res.json(cartas);
                console.log(req.params.carta);
                return [3 /*break*/, 13];
            case 12:
                err_7 = _a.sent();
                console.error(err_7);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
app.get('/mostrar_cartas/:carta', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var carta, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log(req.params.carta);
                return [4 /*yield*/, db.query("SELECT * FROM Cartas WHERE nombre = '" + req.params.carta + "'")];
            case 2:
                carta = _a.sent();
                console.log(carta);
                res.json(carta.rows[0]);
                console.log(req.params.carta);
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                console.error(err_8);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/equipo/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var equipo, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /equipo');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log(req.params.user);
                return [4 /*yield*/, db.query("SELECT * FROM Equipos WHERE usuario_id = '" + req.params.user + "'")];
            case 2:
                equipo = _a.sent();
                console.log(equipo);
                res.json(equipo.rows[0]);
                console.log(equipo.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                console.error(err_9);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/guardar_equipo", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var equipo, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Peticion recibida al endpoint -POST /guardar_equipo");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 14, , 15]);
                console.log(req.body.equipo);
                return [4 /*yield*/, db.query("DELETE FROM Equipos WHERE usuario_id = '" + req.body.user + "'")];
            case 2:
                _a.sent();
                console.log("Delete hechillo");
                if (!(req.body.equipo.length == 1)) return [3 /*break*/, 4];
                return [4 /*yield*/, db.query("INSERT INTO Equipos (usuario_id, carta_id1) VALUES ('" + req.body.user + "', '" + req.body.equipo[0].nombre + "')")];
            case 3:
                _a.sent();
                return [3 /*break*/, 12];
            case 4:
                if (!(req.body.equipo.length == 2)) return [3 /*break*/, 6];
                return [4 /*yield*/, db.query("INSERT INTO Equipos (usuario_id, carta_id1, carta_id2) VALUES ('" + req.body.user + "', '" + req.body.equipo[0].nombre + "', '" + req.body.equipo[1].nombre + "')")];
            case 5:
                _a.sent();
                return [3 /*break*/, 12];
            case 6:
                if (!(req.body.equipo.length == 3)) return [3 /*break*/, 8];
                return [4 /*yield*/, db.query("INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3) VALUES ('" + req.body.user + "', '" + req.body.equipo[0].nombre + "', '" + req.body.equipo[1].nombre + "', '" + req.body.equipo[2].nombre + "')")];
            case 7:
                _a.sent();
                return [3 /*break*/, 12];
            case 8:
                if (!(req.body.equipo.length == 4)) return [3 /*break*/, 10];
                return [4 /*yield*/, db.query("INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3, carta_id4) VALUES ('" + req.body.user + "', '" + req.body.equipo[0].nombre + "', '" + req.body.equipo[1].nombre + "', '" + req.body.equipo[2].nombre + "', '" + req.body.equipo[3].nombre + "')")];
            case 9:
                _a.sent();
                return [3 /*break*/, 12];
            case 10:
                if (!(req.body.equipo.length == 5)) return [3 /*break*/, 12];
                return [4 /*yield*/, db.query("INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3, carta_id4, carta_id5) VALUES ('" + req.body.user + "', '" + req.body.equipo[0].nombre + "', '" + req.body.equipo[1].nombre + "', '" + req.body.equipo[2].nombre + "', '" + req.body.equipo[3].nombre + "', '" + req.body.equipo[4].nombre + "')")];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [4 /*yield*/, db.query("SELECT * FROM Equipos WHERE usuario_id = '" + req.body.user + "'")];
            case 13:
                equipo = _a.sent();
                console.log(equipo.rows[0]);
                res.json(equipo.rows[0]);
                return [3 /*break*/, 15];
            case 14:
                err_10 = _a.sent();
                console.log(err_10);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
app.get('/bot/:nivel', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var equipo, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /bot');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM Equipos WHERE usuario_id = 'Bot" + req.params.nivel + "'")];
            case 2:
                equipo = _a.sent();
                console.log(equipo);
                res.json(equipo.rows[0]);
                console.log("Equipo enviado");
                return [3 /*break*/, 4];
            case 3:
                err_11 = _a.sent();
                console.error(err_11);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/cartas/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cartitas, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /cartas/:user');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT *\nFROM Usuarios_Cartas\nINNER JOIN Cartas\nON Usuarios_Cartas.carta_id = Cartas.id\nWHERE Usuarios_Cartas.usuario_id = '" + req.params.user + "' ORDER BY Cartas.id DESC;")];
            case 2:
                cartitas = _a.sent();
                res.json(cartitas.rows);
                console.log("Cartas de usuario ENVIADAS");
                return [3 /*break*/, 4];
            case 3:
                err_12 = _a.sent();
                console.error(err_12);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/info_user_cartas/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guardar2, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /info/:user');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios_Cartas WHERE usuario_id ='" + req.params.user + "'")];
            case 2:
                guardar2 = _a.sent();
                res.json(guardar2.rows);
                return [3 /*break*/, 4];
            case 3:
                err_13 = _a.sent();
                console.error(err_13);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/info/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db_response, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /info/:user');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("recibiendo info");
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios WHERE id ='" + req.params.user + "'")];
            case 2:
                db_response = _a.sent();
                console.log("Enviando información usuario");
                console.log(db_response.rows[0]);
                res.json(db_response.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_14 = _a.sent();
                console.error(err_14);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/add_card", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Data, comprobacion, user, carta, err_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                Data = {
                    user: req.body.user,
                    carta: req.body.carta,
                };
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios_Cartas WHERE usuario_id = '" + Data.user + "' AND carta_id = " + Data.carta)
                    // 2. Actualizar Cartas
                ];
            case 2:
                comprobacion = _a.sent();
                // 2. Actualizar Cartas
                console.log("Actualizando Cartas Usuario");
                if (!(comprobacion.rows.length > 0)) return [3 /*break*/, 4];
                // Update Cartas
                return [4 /*yield*/, db.query("UPDATE Usuarios_Cartas SET cantidad = " + (comprobacion.rows[0].cantidad + 1) + " WHERE id = " + comprobacion.rows[0].id + " ")];
            case 3:
                // Update Cartas
                _a.sent();
                console.log("Cartas de usuario actualizadas");
                return [3 /*break*/, 6];
            case 4:
                console.log("Creando nueva carta: " + Data.user + ", " + Data.carta);
                return [4 /*yield*/, db.query("INSERT INTO Usuarios_Cartas (usuario_id, carta_id, cantidad) VALUES ('" + Data.user + "', " + Data.carta + ", 1)")];
            case 5:
                _a.sent();
                console.log("Nueva carta creada");
                _a.label = 6;
            case 6: return [4 /*yield*/, db.query("SELECT * FROM Usuarios WHERE id ='" + Data.user + "'")];
            case 7:
                user = _a.sent();
                return [4 /*yield*/, db.query("UPDATE Usuarios SET tiradas = " + (user.rows[0].tiradas + 1) + " WHERE id = '" + Data.user + "'")];
            case 8:
                _a.sent();
                console.log("Incrementando tiradas del usuario");
                return [4 /*yield*/, db.query("SELECT * FROM CARTAS WHERE id = " + Data.carta + " ")];
            case 9:
                carta = _a.sent();
                res.json(carta.rows[0]);
                return [3 /*break*/, 11];
            case 10:
                err_15 = _a.sent();
                console.log(err_15);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
app.post("/usuario", JuankUnderAgua, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comprobacion, err_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                // Comprobar los Datos para saber que usuario es
                console.log("comprobando user");
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios WHERE id = '" + req.body.email + "'")];
            case 2:
                comprobacion = _a.sent();
                console.log("user comrpobado");
                if (!(comprobacion.rows.length < 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, db.query("INSERT INTO Usuarios (id, nombre, tiradas) VALUES ('" + req.body.email + "', '" + req.body.name + "', 0);")];
            case 3:
                _a.sent();
                console.log("usuario creado");
                return [4 /*yield*/, db.query("SELECT * FROM Usuarios WHERE id = '" + req.body.email + "'")];
            case 4:
                comprobacion = _a.sent();
                _a.label = 5;
            case 5:
                console.log("enviando informacion del usuario");
                res.json(comprobacion.rows[0]);
                return [3 /*break*/, 7];
            case 6:
                err_16 = _a.sent();
                console.log(err_16);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port + "\n    \n    ENDPOINTS:\n    -POST /add_card\n    -GET /tiradas/:user\n    -GET /cartas/:user\n    -GET /bot\n    -POST /usuario\n    "); });
