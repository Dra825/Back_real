import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());
import bodyParser from 'body-parser';
const JuankUnderAgua = bodyParser.json()

import * as db from './db-conection'



app.get('/tiradas/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /tiradas/:user');

    try {
        let db_response = await db.query(`SELECT * FROM Usuarios WHERE id ='${req.params.user}'`);

        res.json(db_response.rows[0].tiradas)

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});






app.post("/add_card", JuankUnderAgua, async (req, res) => {
    console.log(req.body)
    try {

        let Data = {
            user: req.body.user,
            carta: req.body.carta,
           

        }
        // Comprobar los Datos para saber que usuario es

        let comprobacion = await db.query(`SELECT * FROM Usuarios_Cartas WHERE usuario_id = '${Data.user}' AND carta_id = ${Data.carta}`)
        // 2. Actualizar Cartas
        console.log("Actualizando Cartas Usuario")
        if (comprobacion.rows.length > 0) {
            // Update Cartas
            await db.query(`UPDATE Usuarios_Cartas SET cantidad = ${comprobacion.rows[0].cantidad + 1} WHERE id = ${comprobacion.rows[0].id} `)
            console.log("Cartas de usuario actualizadas")

        } else {
            console.log(`Creando nueva carta: ${Data.user}, ${Data.carta}`)
            await db.query(`INSERT INTO Usuarios_Cartas (usuario_id, carta_id, cantidad) VALUES ('${Data.user}', ${Data.carta}, 1)`)
            console.log("Nueva carta creada")
        }
        // 3. Incrementar tiradas
        let user = await db.query(`SELECT * FROM Usuarios WHERE id ='${Data.user}'`);
        await db.query(`UPDATE Usuarios SET tiradas = ${user.rows[0].tiradas + 1} WHERE id = '${Data.user}'`);
        console.log("Incrementando tiradas del usuario")
        res.json(`Se ha sumado 1 roll`)
        
    }

    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}
    
    ENDPOINTS:
    -POST /add_card
    -GET /tiradas/:user
    `
));