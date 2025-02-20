import { Pool } from 'pg';



const connectionString = 'postgresql://cartas_game_user:DqON4evQxb7BFUTJ3fB564YGcLbCBDwg@dpg-cum67qpu0jms73bkfjhg-a.frankfurt-postgres.render.com/cartas_game?sslmode=require'


const pool = new Pool({
  connectionString
})

export function query(text: any): any {
    return pool.query(text);
}; 