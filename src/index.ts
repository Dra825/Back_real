import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());
import bodyParser from 'body-parser';
const JuankUnderAgua = bodyParser.json()
import * as db from './db-conection'

app.get('/tiempo_restar/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');
    try {
        let tiempo =  await db.query(`SELECT * FROM Tiempo_Pociones WHERE usuario_id = '${req.params.user}' AND item_id = 'Pocion_Pro' `)
        if (tiempo.rows[0].tiempo > 0) {
 await db.query(`UPDATE Tiempo_Pociones SET tiempo = tiempo -1 WHERE item_id ='Pocion_Pro' AND usuario_id = '${req.params.user}' `)
 tiempo =  await db.query(`SELECT * FROM Tiempo_Pociones WHERE usuario_id = '${req.params.user}' AND item_id = 'Pocion_Pro' `)
}
        console.log(req.params.carta)
        res.json(tiempo.rows[0])

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tiempo/:user/:item', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');
    try {

let item = await db.query(`SELECT * FROM Tiempo_Pociones WHERE usuario_id = '${req.params.user}' AND item_id = '${req.params.item}' `)
        
        console.log(req.params.carta)
        res.json(item.rows[0])

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/tomar", JuankUnderAgua, async (req, res) => {
    console.log(req.body)
    try {

        let Data = {
            user: req.body.user,
            item: req.body.item,
           

        }
        console.log("cositas", Data)
        // Comprobar los Datos para saber que usuario es

        if (Data.item !== "Brazalete") {
            await db.query(`UPDATE Usuarios_Items SET cantidad = cantidad -1 WHERE item_id = '${Data.item}'AND usuario_id = '${Data.user}' `)
          let actualizacion = await db.query(`SELECT * FROM Usuarios_Items WHERE usuario_id = '${Data.user}' AND item_id = '${Data.item}'`)
            if (actualizacion.rows[0].cantidad == 0 ) {
                await db.query(`DELETE FROM Usuarios_Items WHERE usuario_id= '${Data.user}' AND item_id = '${Data.item}'`)
            }
           let comprobacion = await db.query(`SELECT * FROM Tiempo_Pociones WHERE usuario_id = '${Data.user}' AND item_id = '${Data.item}'`)
            if (comprobacion.rows.length > 0) {
                await db.query(`UPDATE Tiempo_Pociones SET tiempo = tiempo +60 WHERE item_id = '${Data.item}' AND usuario_id = '${Data.user}'`)
            }
            else {
                await db.query(`INSERT INTO Tiempo_Pociones (usuario_id, tiempo, item_id) VALUES ('${Data.user}', 60, '${Data.item}' )`)
            }
            let comprobacion2 = await db.query(`SELECT * FROM Tiempo_Pociones WHERE usuario_id = '${Data.user}' AND item_id = '${Data.item}'`)
            res.json(comprobacion2.rows[0])
        }
        
        
    }

    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
});

app.get('/cargar_items/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');
    try {

let item = await db.query(`SELECT * FROM Usuarios_Items WHERE usuario_id = '${req.params.user}' `)
        
        console.log(req.params.carta)
        res.json(item.rows)

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/add_item", JuankUnderAgua, async (req, res) => {
    console.log(req.body)
    try {

        let Data = {
            user: req.body.user,
            item: req.body.item,
            gemas: req.body.gemas
           

        }
        console.log("cositas", Data)
        // Comprobar los Datos para saber que usuario es

        let comprobacion = await db.query(`SELECT * FROM Usuarios_Items WHERE usuario_id = '${Data.user}' AND item_id = '${Data.item}'`)
        // 2. Actualizar Items
        console.log("Actualizando Items Usuario")
        if (comprobacion.rows.length > 0) {
            // Update Items
            await db.query(`UPDATE Usuarios_Items SET cantidad = ${comprobacion.rows[0].cantidad + 1} WHERE item_id = '${Data.item}' `)
            console.log("Items de usuario actualizadas")

        } else {
            console.log(`Creando nuevo item: ${Data.user}, '${Data.item}'`)
            await db.query(`INSERT INTO Usuarios_Items (usuario_id, item_id, cantidad) VALUES ('${Data.user}', '${Data.item}', 1)`)
            console.log("Nuevo item creado")
        }
        await db.query(`UPDATE Usuarios SET gemas = gemas - ${Data.gemas} WHERE id = '${Data.user}' `)
        res.json("Item añadido a tu inventario con exito")
        
    }

    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
});

app.post("/gemas", JuankUnderAgua, async (req, res) => {
    console.log("Peticion recibida al endpoint -POST /guardar_equipo")
    try {

      console.log(req.body.equipo)
        await db.query(`UPDATE Usuarios SET gemas = gemas + ${req.body.gemas}  WHERE id = '${req.body.user}'`)
        console.log("GEMAS ACTUALIZADAS :D")
       res.json("TODO ACTUALIZADO UwU")
    }

    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
});

app.get('/equipo_cargar/:carta1/:carta2/:carta3/:carta4/:carta5', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');
    let cartas: any[] = [];
    try {
        console.log(req.params.carta)
        if (req.params.carta1) {
        let carta1 = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta1}'`);
        cartas.push(carta1.rows[0])
    }   if (req.params.carta2) {
        let carta2 = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta2}'`);
        cartas.push(carta2.rows[0])
    }   if (req.params.carta3) { 
        let carta3 = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta3}'`);
        cartas.push(carta3.rows[0])
    }   if (req.params.carta4) {
        let carta4 = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta4}'`);
        cartas.push(carta4.rows[0])
    }   if (req.params.carta5) {
        let carta5 = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta5}'`);
        cartas.push(carta5.rows[0])
    }
    
        res.json(cartas)
        console.log(req.params.carta)
        

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/mostrar_cartas/:carta', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');

    try {
        console.log(req.params.carta)
        let carta = await db.query(`SELECT * FROM Cartas WHERE nombre = '${req.params.carta}'`);
        
    console.log(carta)
        
        res.json(carta.rows[0])
        console.log(req.params.carta)
        

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/equipo/:user', async (req, res) => {
    console.log('Petición recibida al endpoint GET /equipo');

    try {
        console.log(req.params.user)
        let equipo = await db.query(`SELECT * FROM Equipos WHERE usuario_id = '${req.params.user}'`);
        
    console.log(equipo)
        
        res.json(equipo.rows[0])
        console.log(equipo.rows[0])
        

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
WHERE Usuarios_Cartas.usuario_id = '${req.params.user}' ORDER BY Cartas.id DESC;`);
        
    
        
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
        let carta =  await db.query(`SELECT * FROM CARTAS WHERE id = ${Data.carta} `);
        res.json(carta.rows[0])
        
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