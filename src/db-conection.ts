import { Pool } from 'pg';

/*const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'proyecto'
});*/

const connectionString = 'postgresql://cartas_game_user:DqON4evQxb7BFUTJ3fB564YGcLbCBDwg@dpg-cum67qpu0jms73bkfjhg-a/cartas_game'


const pool = new Pool({
  connectionString
})

export function query(text: any): any {
    return pool.query(text);
};






