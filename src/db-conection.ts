"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
/*const pool = new Pool({
user: 'postgres',
password: '1234',
host: 'localhost',
port: 5432, //default Postgres port
database:'Juego'
}); */
var connectionString = 'postgresql://cartas_game_user:DqON4evQxb7BFUTJ3fB564YGcLbCBDwg@dpg-cum67qpu0jms73bkfjhg-a.frankfurt-postgres.render.com/cartas_game'
var pool = new pg_1.Pool({
    connectionString: connectionString
});
function query(text: any) {
    return pool.query(text);
}
exports.query = query;
