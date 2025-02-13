import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());
import bodyParser from 'body-parser';
const JuankUnderAgua = bodyParser.json()
import * as db from './db-conection'

app.get('/equipo/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');

    try {
        console.log(req.params.user)
        let equipo = await db.query(`SELECT * FROM Equipos WHERE usuario_id = '${req.params.user}'`);
         
    console.log(equipo)
        
        res.json(equipo.rows[0])
        console.log(req.params.user)
        

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/guardar_equipo", JuankUnderAgua, async (req, res) => {
    console.log("Peticion recibida al endpoint -POST /guardar_equipo")
    try {

      console.log(req.body.equipo)
        await db.query(`DELETE FROM Equipos WHERE usuario_id = '${req.body.user}'`)
        console.log("Delete hechillo")
        if(req.body.equipo.length == 1) {
        await db.query(`INSERT INTO Equipos (usuario_id, carta_id1) VALUES ('${req.body.user}', '${req.body.equipo[0].nombre}')`)
        }
        else if(req.body.equipo.length == 2) {
        await db.query(`INSERT INTO Equipos (usuario_id, carta_id1, carta_id2) VALUES ('${req.body.user}', '${req.body.equipo[0].nombre}', '${req.body.equipo[1].nombre}')`)
        }
        else if(req.body.equipo.length == 3) {
        await db.query(`INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3) VALUES ('${req.body.user}', '${req.body.equipo[0].nombre}', '${req.body.equipo[1].nombre}', '${req.body.equipo[2].nombre}')`)
        }
        else if(req.body.equipo.length == 4) {
        await db.query(`INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3, carta_id4) VALUES ('${req.body.user}', '${req.body.equipo[0].nombre}', '${req.body.equipo[1].nombre}', '${req.body.equipo[2].nombre}', '${req.body.equipo[3].nombre}')`)
        }
        else if(req.body.equipo.length == 5) {
        await db.query(`INSERT INTO Equipos (usuario_id, carta_id1, carta_id2, carta_id3, carta_id4, carta_id5) VALUES ('${req.body.user}', '${req.body.equipo[0].nombre}', '${req.body.equipo[1].nombre}', '${req.body.equipo[2].nombre}', '${req.body.equipo[3].nombre}', '${req.body.equipo[4].nombre}')`)
        }
        
        let equipo = await db.query(`SELECT * FROM Equipos WHERE usuario_id = '${req.body.user}'`)
        console.log(equipo.rows[0])
       res.json(equipo.rows[0])
    }

    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}); 


app.get('/bot/:nivel', async (req, res) => {
    console.log('Petición recibida al endpoint GET /bot');

    try {
        
        let equipo = await db.query(`SELECT * FROM Equipos WHERE usuario_id = 'Bot${req.params.nivel}'`);
        
    console.log(equipo)
        
        res.json(equipo.rows[0])
        console.log("Equipo enviado")
        

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});





app.get('/cartas/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /cartas/:user');

    try {
        
        let cartitas = await db.query(`SELECT *
FROM Usuarios_Cartas
INNER JOIN Cartas
ON Usuarios_Cartas.carta_id = Cartas.id
WHERE Usuarios_Cartas.usuario_id = '${req.params.user}' ORDER BY rareza DESC;`);
        
    
        
        res.json(cartitas.rows)
        console.log("Cartas de usuario ENVIADAS")
        

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/info_user_cartas/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /info/:user');

    try {
         let guardar2 = await db.query(`SELECT * FROM Usuarios_Cartas WHERE usuario_id ='${req.params.user}'`);
        
        res.json(guardar2.rows)
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/info/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /info/:user');

    try {
        console.log("recibiendo info")
        let db_response = await db.query(`SELECT * FROM Usuarios WHERE id ='${req.params.user}'`);
        console.log("Enviando información usuario")
        console.log(db_response.rows[0])
        res.json(db_response.rows[0])
        
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


app.post("/usuario", JuankUnderAgua, async (req, res) => {
    console.log(req.body)
    try {

      
        // Comprobar los Datos para saber que usuario es
        console.log("comprobando user")
        let comprobacion = await db.query(`SELECT * FROM Usuarios WHERE id = '${req.body.email}'`)
        console.log("user comrpobado")
        if (comprobacion.rows.length < 1) {
              await db.query(`INSERT INTO Usuarios (id, nombre, tiradas) VALUES ('${req.body.email}', '${req.body.name}', 0);`)
              console.log("usuario creado") 
             comprobacion = await db.query(`SELECT * FROM Usuarios WHERE id = '${req.body.email}'`)
        }
   
            console.log("enviando informacion del usuario")
            res.json(comprobacion.rows[0])
        
  
       
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
    -GET /cartas/:user
    -GET /bot
    -POST /usuario
    `
));