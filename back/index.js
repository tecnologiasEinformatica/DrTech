const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// Añadir middleware para analizar solicitudes JSON
app.use(express.json());
// Añadir middleware para analizar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // O el nombre que desees usar
  },
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'BD_DrTech'
});

app.use(cors());
app.listen(3001, () => {
  console.log('listening on 3001');
});


app.get('/', (req, res) => {
  res.send({ status: 200 });
});

//* USUARIO ENDPOINT */
// agregar 
app.post('/usuario', (req, res) => {
    const nombre_usuario = req.body.nombre_usuario;
    const email_usuario = req.body.email_usuario;
    const password = req.body.password;
    const tipo_usuario = req.body.tipo_usuario;
    db.query(
      `INSERT INTO usuario (nombre_usuario,email_usuario,password,tipo_usuario) VALUES(?,?,md5(?),?)`,[nombre_usuario,email_usuario,password,tipo_usuario],
      (err, result) => {
        if (err) {
          res.send({
            status: 400,
            message: err
          });
        } else {
          res.status(201).send({
            status: 201,
            message: 'USUARIO CREADO CON EXITO',
            data: result
          });
        }
      }
    );
  });

//  consultar usuario
app.get('/usuario/:id' ,(req,res)=>{
    const usuarioId = req.params.id
    db.query(`SELECT id_usuario,nombre_usuario,email_usuario FROM usuario WHERE id_usuario=${usuarioId}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result[0])
        }else{
        res.status(400).send({
            message: 'NO EXISTE USUARIO',
        
        })
        }
    }
    );
})

// login   usuario
app.post('/login', (req, res) => {
    const email_usuario = req.body.email_usuario;
    const password = req.body.password;
    db.query(
      `SELECT  id_usuario,nombre_usuario,email_usuario FROM usuario WHERE email_usuario=? AND password=md5(?)`,[email_usuario,password],
      (err,result) => {
        if (err){
           res.send({
                status: 500,
                message: err
           }) 
        }else {
            if (result.length >0){
                res.status(200)
                .send(result[0])
            }else{
                
            res.status(401).send({
                status: 401,
                message: 'USUARIO O CONTRASEÑA INCORRECTA',
            
            })
            }
            
        }

    }
    );
  });

//** INGRESO ENDPOINT */
// agregar
app.post('/ingreso', (req, res) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const telefono = req.body.telefono;
  const reconocido = req.body.reconocido;
  const tipo_dispositivo = req.body.tipo_dispositivo;
  const marca = req.body.marca;
  const capacidad_almacenamiento = req.body.capacidad_almacenamiento;
  const identificador = req.body.identificador;
  const comentario_cliente = req.body.comentario_cliente;
  const rut = req.body.rut;
  const comprobante_ingreso = req.body.comprobante_ingreso;
  const recupera_ingreso = req.body.recupera_ingreso;

  db.query(
    `INSERT INTO ingreso (nombre,correo,telefono,reconocido,tipo_dispositivo,marca,capacidad_almacenamiento,identificador,comentario_cliente,rut,comprobante_ingreso,recupera_ingreso) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      nombre,
      correo,
      telefono,
      reconocido,
      tipo_dispositivo,
      marca,
      capacidad_almacenamiento,
      identificador,
      comentario_cliente,
      rut,
      comprobante_ingreso,
      recupera_ingreso
    ],
    (err, result) => {
      if (err) {
        res.send({
          status: 400,
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'INGRESO CREADO CON EXITO',
          data: result
        });
      }
    }
  );
});
// consultar ingreso
app.get('/ingreso/:id' ,(req,res)=>{
    const ingresoId = req.params.id
    db.query(`SELECT id_ingreso,nombre,correo,telefono,reconocido,tipo_dispositivo,marca,capacidad_almacenamiento,identificador,comentario_cliente,rut,comprobante_ingreso FROM ingreso WHERE id_ingreso=${ingresoId}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result[0])
        }else{
        res.status(400).send({
            message: 'NO EXISTE INGRESO',
        
        })
        }
    }
    );
})
//  lista  ingreso  por id y pagina
app.get('/ingreso/all/:id_ingreso/:page/:limit' ,(req,res)=>{
    const id = req.params.id_ingreso
    const page = req.params.page
    const limit = req.params.limit
    const start = (page - 1) * limit
    

    db.query(`SELECT * FROM ingreso WHERE id_ingreso=${id} order by id_ingreso DESC limit ${start}, ${limit}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }

    }
    );

})

//  lista  todos los ingresos
app.get('/ingreso/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM ingreso  order by id_ingreso DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})

// Ingreso sin diagnosticos
app.get('/ingreso/sin-diagnostico/:page/:limit', (req, res) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const start = (page - 1) * limit;

  const query = `
    SELECT i.*
    FROM ingreso i
    LEFT JOIN diagnostico d ON i.id_ingreso = d.id_ingreso
    WHERE d.id_diagnostico IS NULL
    ORDER BY i.id_ingreso DESC
    LIMIT ${start}, ${limit};
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener ingresos sin diagnóstico:', err);
      res.status(500).json({ error: 'Error al obtener ingresos sin diagnóstico' });
    } else {
      res.json(result);
    }
  });
});
//lista  todos los ingresos y diagnosticos
app.get('/ingresos-y-diagnosticos/:page/:limit', (req, res) => {
  const query = `
  SELECT i.*, d.*
  FROM ingreso i
  LEFT JOIN diagnostico d ON i.id_ingreso = d.id_ingreso
  WHERE i.id_ingreso IS NOT NULL AND d.id_ingreso IS NOT NULL;
  `;
  
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener ingresos y diagnósticos:', err);
      res.status(500).json({ error: 'Error al obtener ingresos y diagnósticos' });
    } else {
      res.json(result);
    }
  });
});
//lista  todos los ingresos y diagnosticos con id 
app.get('/detalle-ingreso/:id_ingreso', (req, res) => {
  const { id_ingreso } = req.params;

  const query = `
    SELECT i.*, d.*
    FROM ingreso i
    LEFT JOIN diagnostico d ON i.id_ingreso = d.id_ingreso
    WHERE i.id_ingreso = ? AND d.id_ingreso IS NOT NULL;
  `;
  
  db.query(query, [id_ingreso], (err, result) => {
    if (err) {
      console.error('Error al obtener ingresos y diagnósticos:', err);
      res.status(500).json({ error: 'Error al obtener ingresos y diagnósticos' });
    } else {
      res.json(result);
    }
  });
});

app.get('/ingresos-y-diagnosticos-sin-presupuesto/:page/:limit', (req, res) => {
  const query = `
    SELECT i.*, d.*, p.*
    FROM ingreso i
    LEFT JOIN diagnostico d ON i.id_ingreso = d.id_ingreso
    LEFT JOIN presupuesto p ON i.id_ingreso = p.id_ingreso
    WHERE p.id_presupuesto IS NULL
    ORDER BY i.id_ingreso;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener ingresos, diagnósticos y sin presupuesto:', err);
      res.status(500).json({ error: 'Error al obtener ingresos, diagnósticos y sin presupuesto' });
    } else {
      res.json(result);
    }
  });
});


//** LEADS ENDPOINT */
// agregar
app.post('/leads', (req, res) => {
    const nombre_leads = req.body.nombre_leads;
    const telefono_leads = req.body.telefono_leads;
    const correo_leads = req.body.correo_leads;
    const comentarios_leads = req.body.comentarios_leads;
    const mensaje_leads = req.body.mensaje_leads;
    const tipo_leads = req.body.tipo_leads;
    const accion_leads = req.body.accion_leads;
    const estado_leads = req.body.estado_leads;
    db.query(
      `INSERT INTO leads (nombre_leads,telefono_leads,correo_leads,comentarios_leads,mensaje_leads,tipo_leads,accion_leads,estado_leads) VALUES(?,?,?,?,?,?,?,?)`,[nombre_leads,telefono_leads,correo_leads,comentarios_leads,mensaje_leads,tipo_leads,accion_leads,estado_leads],
      (err, result) => {
        if (err) {
          res.send({
            status: 400,
            message: err
          });
        } else {
          res.status(201).send({
            status: 201,
            message: 'INGRESO LEADS CREADO CON EXITO',
            data: result
          });
        }
      }
    );
  });
//consultar leads
app.get('/leads/:id' ,(req,res)=>{
    const leadsId = req.params.id
    db.query(`SELECT * FROM leads WHERE id_leads=${leadsId}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result[0])
        }else{
        res.status(400).send({
            message: 'NO EXISTE LEADS',
        
        })
        }
    }
    );
})  

//  lista  todos los Leads
app.get('/leads/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM leads order by id_leads DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})
//editar  leads
app.put('/leads/:id' ,(req,res)=>{
    const id = req.params.id
    const nombre_leads = req.body.nombre_leads;
    const telefono_leads = req.body.telefono_leads;
    const correo_leads = req.body.correo_leads;
    const comentarios_leads = req.body.comentarios_leads;
    const mensaje_leads = req.body.mensaje_leads;
    const tipo_leads = req.body.tipo_leads;
    const accion_leads = req.body.accion_leads;
    const estado_leads = req.body.estado_leads;
    db.query(`UPDATE leads SET nombre_leads=?,telefono_leads=?,correo_leads=?,comentarios_leads=?,mensaje_leads=?,tipo_leads=?,accion_leads=?,estado_leads=? where id_leads=?`,[nombre_leads,telefono_leads,correo_leads,comentarios_leads,mensaje_leads,tipo_leads,accion_leads,estado_leads,id],
    (err,result) => {
        if (err){
           res.send({
                status: 400,
                message: err
           }) 
        }else {
            res.status(200)
            .send({
                message: 'LEADS ACTUALIZADA CON EXITO',
                data: result
            })
        }

    }
    );

})


//* DIAGNOSTICAR ENDPOINT */
// agregar 
app.post('/diagnostico', (req, res) => {
    const id_ingreso = req.body.id_ingreso;
    const marca_diagnostico = req.body.marca_diagnostico;
    const tamaño_diagnostico = req.body.tamaño_diagnostico;
    const capacidad_diagnostico = req.body.capacidad_diagnostico;
    const modelo_diagnostico = req.body.modelo_diagnostico;
    const serial_diagnostico = req.body.serial_diagnostico;
    const falla_diagnostico = req.body.falla_diagnostico;
    const urgente_diagnostico = req.body.urgente_diagnostico;
    const standar_diagnostico = req.body.standar_diagnostico;
    const respado_diagnostico = req.body.respado_diagnostico;
    const comentario_diagnostico = req.body.comentario_diagnostico;
    const costoInterno_diagnostico = req.body.costoInterno_diagnostico;
    db.query(
      `INSERT INTO diagnostico (id_ingreso,marca_diagnostico,tamaño_diagnostico,capacidad_diagnostico,modelo_diagnostico,serial_diagnostico,falla_diagnostico,urgente_diagnostico,standar_diagnostico,respado_diagnostico,comentario_diagnostico,costoInterno_diagnostico) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,[id_ingreso,marca_diagnostico,tamaño_diagnostico,capacidad_diagnostico,modelo_diagnostico,serial_diagnostico,falla_diagnostico,urgente_diagnostico,standar_diagnostico,respado_diagnostico,comentario_diagnostico,costoInterno_diagnostico],
      (err, result) => {
        if (err) {
          res.status(500).send({
            message: err
          });
        } else {
          res.status(201).send({
            status: 201,
            message: 'DIAGNOSTICO CREADO CON EXITO',
            data: result
          });
        }
      }
    );
  });

 //consultar diagnostico
 app.get('/diagnostico/:id' ,(req,res)=>{
    const diagnosticoId = req.params.id
    db.query(`SELECT * FROM diagnostico WHERE id_diagnostico=${diagnosticoId}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result[0])
        }else{
        res.status(400).send({
            message: 'NO EXISTE DIAGNOSTICO',
        
        })
        }
    }
    );
})
//consultar diagnostico de ingreso
app.get('/diagnostico/all/:id_ingreso' ,(req,res)=>{
    const id = req.params.id_ingreso
    db.query(`SELECT * FROM diagnostico WHERE id_ingreso=${id}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }
    }
    );
})

//editar  diagnosticar
app.put('/diagnostico/:id' ,(req,res)=>{
    const id = req.params.id
    const marca_diagnostico = req.body.marca_diagnostico;
    const tamaño_diagnostico = req.body.tamaño_diagnostico;
    const capacidad_diagnostico = req.body.capacidad_diagnostico;
    const modelo_diagnostico = req.body.modelo_diagnostico;
    const serial_diagnostico = req.body.serial_diagnostico;
    const falla_diagnostico = req.body.falla_diagnostico;
    const urgente_diagnostico = req.body.urgente_diagnostico;
    const standar_diagnostico = req.body.standar_diagnostico;
    const respado_diagnostico = req.body.respado_diagnostico;
    const comentario_diagnostico = req.body.comentario_diagnostico;
    const costoInterno_diagnostico = req.body.costoInterno_diagnostico;
    db.query(`UPDATE diagnostico SET marca_diagnostico=?,tamaño_diagnostico=?,capacidad_diagnostico=?,modelo_diagnostico=?,serial_diagnostico=?,falla_diagnostico=?,urgente_diagnostico=?,standar_diagnostico=?,respado_diagnostico=?,comentario_diagnostico=? where id_diagnostico=?,costoInterno_diagnostico=?`,[marca_diagnostico,tamaño_diagnostico,capacidad_diagnostico,modelo_diagnostico,serial_diagnostico,falla_diagnostico,urgente_diagnostico,standar_diagnostico,respado_diagnostico,comentario_diagnostico,costoInterno_diagnostico,id],
    (err,result) => {
        if (err){
           res.send({
                status: 400,
                message: err
           }) 
        }else {
            res.status(200)
            .send({
                message: 'DIAGNOSTICO ACTUALIZADA CON EXITO',
                data: result
            })
        }

    }
    );

})

//  lista  diagnosticar por id y pagina
app.get('/diagnostico/all/:id_ingreso/:page/:limit' ,(req,res)=>{
    const id = req.params.id_ingreso
    const page = req.params.page
    const limit = req.params.limit
    const start = (page - 1) * limit
    

    db.query(`SELECT * FROM diagnostico WHERE id_ingreso=${id} order by id_diagnostico DESC limit ${start}, ${limit}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }

    }
    );

})

//  lista  todos los diagnosticos
app.get('/diagnostico/all/:page/:limit' ,(req,res)=>{
    const page = req.params.page
    const limit = req.params.limit
    const start = (page - 1) * limit
    
    db.query(`SELECT * FROM diagnostico  order by id_diagnostico DESC limit ${start}, ${limit}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }

    }
    );

})

// Diagnostico sin presupuesto
app.get('/diagnostico/sin-presupuesto/:page/:limit', (req, res) => {
  const query = `
    SELECT d.id_diagnostico, d.id_ingreso, d.fecha_diagnostico, d.marca_diagnostico, d.tamaño_diagnostico, d.capacidad_diagnostico, d.modelo_diagnostico, d.serial_diagnostico, d.falla_diagnostico, d.urgente_diagnostico, d.standar_diagnostico, d.respado_diagnostico, d.comentario_diagnostico, d.costoInterno_diagnostico
    FROM diagnostico d
    LEFT JOIN presupuesto p ON d.id_ingreso = p.id_ingreso
    WHERE p.id_presupuesto IS NULL;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener diagnósticos sin presupuesto:', err);
      res.status(500).json({ error: 'Error al obtener diagnósticos sin presupuesto' });
    } else {
      res.json(result);
    }
  });
});


//* PRESUPUESTO ENDPOINT */
// agregar
app.post('/presupuesto', (req, res) => {
    const id_ingreso = req.body.id_ingreso;
    const exento_presupuesto = req.body.exento_presupuesto;
    const netoStandar_presupuesto = req.body.netoStandar_presupuesto;
    const ivaStandar_presupuesto = req.body.ivaStandar_presupuesto;
    const totalStandar_presupuesto = req.body.totalStandar_presupuesto;
    const netoUrgente_presupuesto = req.body.netoUrgente_presupuesto;
    const ivaUrgente_presupuesto = req.body.ivaUrgente_presupuesto;
    const totalUrgente_presupuesto = req.body.totalUrgente_presupuesto;
    const medioRespaldo_presupuesto = req.body.medioRespaldo_presupuesto;
    const descuentoAprovacion_presupuesto = req.body.descuentoAprovacion_presupuesto;
    const descuentoRecuperacion_presupuesto = req.body.descuentoRecuperacion_presupuesto;
    const ivaDescuentoAprovacion_presupuesto = req.body.ivaDescuentoAprovacion_presupuesto;
    const ivaDescuentoRecuperacion_presupuesto = req.body.ivaDescuentoRecuperacion_presupuesto;
    const valorNetoStandar_presupuesto = req.body.valorNetoStandar_presupuesto;
    const valorNetoStandarRecuperacion_presupuesto = req.body.valorNetoStandarRecuperacion_presupuesto;
    const valorNetoUrgenterecuperacion_presupuesto = req.body.valorNetoUrgenterecuperacion_presupuesto;
    db.query(
      `INSERT INTO presupuesto (id_ingreso,exento_presupuesto,netoStandar_presupuesto,ivaStandar_presupuesto,totalStandar_presupuesto,netoUrgente_presupuesto,ivaUrgente_presupuesto,totalUrgente_presupuesto,medioRespaldo_presupuesto,descuentoAprovacion_presupuesto,descuentoRecuperacion_presupuesto,ivaDescuentoAprovacion_presupuesto,ivaDescuentoRecuperacion_presupuesto,valorNetoStandar_presupuesto,valorNetoStandarRecuperacion_presupuesto,valorNetoUrgenterecuperacion_presupuesto) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[id_ingreso,exento_presupuesto,netoStandar_presupuesto,ivaStandar_presupuesto,totalStandar_presupuesto,netoUrgente_presupuesto,ivaUrgente_presupuesto,totalUrgente_presupuesto,medioRespaldo_presupuesto,descuentoAprovacion_presupuesto,descuentoRecuperacion_presupuesto,ivaDescuentoAprovacion_presupuesto,ivaDescuentoRecuperacion_presupuesto,valorNetoStandar_presupuesto,valorNetoStandarRecuperacion_presupuesto,valorNetoUrgenterecuperacion_presupuesto],
      (err, result) => {
        if (err) {
          res.status(500).send({
            message: err
          });
        } else {
          res.status(201).send({
            status: 201,
            message: 'PRESUPUESTO CREADO CON EXITO',
            data: result
          });
        }
      }
    );
  });
  //consultar Presupuesto
 app.get('/presupuesto/:id' ,(req,res)=>{
    const presupuestoId = req.params.id
    db.query(`SELECT * FROM presupuesto WHERE id_presupuesto=${presupuestoId}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result[0])
        }else{
        res.status(400).send({
            message: 'NO EXISTE PRESUPUESTO',
        
        })
        }
    }
    );
})
//editar  Presupuesto
app.put('/presupuesto/:id' ,(req,res)=>{
    const id = req.params.id
    const exento_presupuesto = req.body.exento_presupuesto;
    const netoStandar_presupuesto = req.body.netoStandar_presupuesto;
    const ivaStandar_presupuesto = req.body.ivaStandar_presupuesto;
    const totalStandar_presupuesto = req.body.totalStandar_presupuesto;
    const netoUrgente_presupuesto = req.body.netoUrgente_presupuesto;
    const ivaUrgente_presupuesto = req.body.ivaUrgente_presupuesto;
    const totalUrgente_presupuesto = req.body.totalUrgente_presupuesto;
    const medioRespaldo_presupuesto = req.body.medioRespaldo_presupuesto;
    const descuentoAprovacion_presupuesto = req.body.descuentoAprovacion_presupuesto;
    const descuentoRecuperacion_presupuesto = req.body.descuentoRecuperacion_presupuesto;
    const ivaDescuentoAprovacion_presupuesto = req.body.ivaDescuentoAprovacion_presupuesto;
    const ivaDescuentoRecuperacion_presupuesto = req.body.ivaDescuentoRecuperacion_presupuesto;
    const valorNetoStandar_presupuesto = req.body.valorNetoStandar_presupuesto;
    const valorNetoStandarRecuperacion_presupuesto = req.body.valorNetoStandarRecuperacion_presupuesto;
    const valorNetoUrgenterecuperacion_presupuesto = req.body.valorNetoUrgenterecuperacion_presupuesto;
    db.query(`UPDATE presupuesto SET exento_presupuesto=?,netoStandar_presupuesto=?,ivaStandar_presupuesto=?,totalStandar_presupuesto=?,netoUrgente_presupuesto=?,ivaUrgente_presupuesto=?,totalUrgente_presupuesto=?,medioRespaldo_presupuesto=?,descuentoAprovacion_presupuesto=?,descuentoRecuperacion_presupuesto=?,ivaDescuentoAprovacion_presupuesto=?,ivaDescuentoRecuperacion_presupuesto=?,valorNetoStandar_presupuesto=?,valorNetoStandarRecuperacion_presupuesto=?,valorNetoUrgenterecuperacion_presupuesto=? where id_presupuesto=?`,[exento_presupuesto,netoStandar_presupuesto,ivaStandar_presupuesto,totalStandar_presupuesto,netoUrgente_presupuesto,ivaUrgente_presupuesto,totalUrgente_presupuesto,medioRespaldo_presupuesto,descuentoAprovacion_presupuesto,descuentoRecuperacion_presupuesto,ivaDescuentoAprovacion_presupuesto,ivaDescuentoRecuperacion_presupuesto,valorNetoStandar_presupuesto,valorNetoStandarRecuperacion_presupuesto,valorNetoUrgenterecuperacion_presupuesto,id],
    (err,result) => {
        if (err){
           res.send({
                status: 400,
                message: err
           }) 
        }else {
            res.status(200)
            .send({
                message: 'DIAGNOSTICO ACTUALIZADA CON EXITO',
                data: result
            })
        }

    }
    );

})
//consultar presupuesto de ingreso
app.get('/presupuesto/all/:id_ingreso' ,(req,res)=>{
    const id = req.params.id_ingreso
    db.query(`SELECT * FROM presupuesto WHERE id_ingreso=${id}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }
    }
    );
})
//  lista  presupuesto por id y pagina
app.get('/presupuesto/all/:id_ingreso/:page/:limit' ,(req,res)=>{
    const id = req.params.id_ingreso
    const page = req.params.page
    const limit = req.params.limit
    const start = (page - 1) * limit
    

    db.query(`SELECT * FROM presupuesto WHERE id_ingreso=${id} order by id_presupuesto DESC limit ${start}, ${limit}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }

    }
    );

})
//  lista  todos los presupuesto
app.get('/presupuesto/all/:page/:limit' ,(req,res)=>{
    const page = req.params.page
    const limit = req.params.limit
    const start = (page - 1) * limit

    db.query(`SELECT * FROM presupuesto  order by id_presupuesto DESC limit ${start}, ${limit}`,
    (err,result) => {
        if (result.length >0){
            res.status(200)
            .send(result)
        }else{
        res.status(400).send({
            message: 'NO EXISTE DATOS',
        
        })
        }

    }
    );

})
//  lista  todos los presupuesto con ingresos 
app.get('/ingresos-con-presupuesto/:page/:limit', (req, res) => {
  const { page, limit } = req.params;

  const query = `
    SELECT i.*, p.*
    FROM ingreso i
    INNER JOIN presupuesto p ON i.id_ingreso = p.id_ingreso
    LIMIT ${page - 1}, ${limit};
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener ingresos con presupuesto:', err);
      res.status(500).json({ error: 'Error al obtener ingresos con presupuesto' });
    } else {
      res.json(result);
    }
  });
});


//* APROBACION ENDPOINT */
// agregar 
app.post('/aprobacion', (req, res) => {
  const id_presupuesto = req.body.id_presupuesto;
  const estado_aprobacion = req.body.estado_aprobacion;
  const tipoServicio_aprobacion = req.body.tipoServicio_aprobacion;
  const comentario_aprobacion = req.body.comentario_aprobacion;
  
  db.query(
    `INSERT INTO aprobacion (id_presupuesto, estado_aprobacion, tipoServicio_aprobacion, comentario_aprobacion) VALUES(?,?,?,?)`,[id_presupuesto, estado_aprobacion, tipoServicio_aprobacion, comentario_aprobacion],
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'APROBACION CREADO CON EXITO',
          data: result
        });
      }
    }
  );
});

//  lista  todos las Aprobaciones
app.get('/aprobacion/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit

  db.query(`SELECT * FROM aprobacion  order by id_aprobacion DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})


//** RECUPERACION ENDPOINT */
// agregar
app.post('/recuperacion', (req, res) => {
  const id_ingreso = req.body.id_ingreso;
  const estado_recuperacion = req.body.estado_recuperacion;
  const fallaProceso_recuperacion = req.body.fallaProceso_recuperacion;
  const gbRecuperados_recuperacion = req.body.gbRecuperados_recuperacion;
  const comentarioTrabajo_recuperacion = req.body.comentarioTrabajo_recuperacion;

  db.query(
    `INSERT INTO recuperacion (id_ingreso,estado_recuperacion,fallaProceso_recuperacion,gbRecuperados_recuperacion,comentarioTrabajo_recuperacion) VALUES(?,?,?,?,?)`,[id_ingreso,estado_recuperacion,fallaProceso_recuperacion,gbRecuperados_recuperacion,comentarioTrabajo_recuperacion],
    (err, result) => {
      if (err) {
        res.send({
          status: 400,
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'INGRESO DE RECUPERACION CREADO CON EXITO',
          data: result
        });
      }
    }
  );
});

//  lista  todas las recuperaciones
app.get('/recuperacion/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM recuperacion order by id_recuperacion DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})


//** CIERRE ENDPOINT */
// agregar
/* app.post('/cierre', (req, res) => {
  const id_ingreso = req.body.id_ingreso;
  const estado_cierre = req.body.estado_cierre;
  const formaPago_cierre = req.body.formaPago_cierre;
  const montoPago_cierre = req.body.montoPago_cierre;
  const oc_cierre = req.body.oc_cierre;
  const numeroFactura_cierre = req.body.numeroFactura_cierre;
  const comprobanteFiele_cierre = req.body.comprobanteFiele_cierre;
  const comentario_cierre = req.body.comentario_cierre;

  db.query(
    `INSERT INTO cierre (id_ingreso,estado_cierre,formaPago_cierre,montoPago_cierre,oc_cierre,numeroFactura_cierre,comprobanteFiele_cierre,comentario_cierre) VALUES(?,?,?,?,?,?,?,?)`,[id_ingreso,estado_cierre,formaPago_cierre,montoPago_cierre,oc_cierre,numeroFactura_cierre,comprobanteFiele_cierre,comentario_cierre],
    (err, result) => {
      if (err) {
        res.send({
          status: 400,
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'INGRESO DE CIERRE CREADO CON EXITO',
          data: result
        });
      }
    }
  );
}); */

//agrega cierre con File
app.post('/cierre', upload.single('comprobanteFiele_cierre'), (req, res) => {
  try {
    const id_ingreso = req.body.id_ingreso;
    const estado_cierre = req.body.estado_cierre;
    const formaPago_cierre = req.body.formaPago_cierre;
    const montoPago_cierre = req.body.montoPago_cierre;
    const oc_cierre = req.body.oc_cierre;
    const numeroFactura_cierre = req.body.numeroFactura_cierre;
    const comprobanteFiele_cierre = req.file; // multer añadirá el archivo a req.file
    const comentario_cierre = req.body.comentario_cierre;

    // Realizar la consulta SQL para insertar los datos
    const sql = 'INSERT INTO cierre (id_ingreso, estado_cierre, formaPago_cierre, montoPago_cierre, oc_cierre, numeroFactura_cierre, comprobanteFiele_cierre, comentario_cierre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [id_ingreso, estado_cierre, formaPago_cierre, montoPago_cierre, oc_cierre, numeroFactura_cierre, comprobanteFiele_cierre.filename, comentario_cierre];

    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al realizar la consulta SQL:', err);
        res.status(500).send({
          status: 500,
          message: 'Error interno del servidor',
          error: err.message,
        });
      } else {
       
        res.status(201).send({
          status: 201,
          message: 'CIERRE CREADO CON ÉXITO',
          data: result,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
});

// lista  todos los cierre
app.get('/cierre/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM cierre order by id_cierre DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})

//* DESCUENTO ENDPOINT */
// agregar 
app.post('/descuento', (req, res) => {
  const id_presupuesto = req.body.id_presupuesto;
  const valor_netoStandarDescuento = req.body.valor_netoStandarDescuento;
  const valor_Urgente_descuento = req.body.valor_Urgente_descuento;
  const porcentaje_descuento = req.body.porcentaje_descuento;
  const medio_respaldo_descuento = req.body.medio_respaldo_descuento;
  const exento_descuento = req.body.exento_descuento;
  const descripcion_descuento = req.body.descripcion_descuento;
  db.query(
    `INSERT INTO descuento (id_presupuesto, valor_netoStandarDescuento, valor_Urgente_descuento, porcentaje_descuento,medio_respaldo_descuento,exento_descuento,descripcion_descuento) VALUES(?,?,?,?,?,?,?)`,[id_presupuesto, valor_netoStandarDescuento, valor_Urgente_descuento, porcentaje_descuento,medio_respaldo_descuento,exento_descuento,descripcion_descuento],
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'DESCUENTO CREADO CON EXITO',
          data: result
        });
      }
    }
  );
});

//  lista  todas las descuentos
app.get('/descuento/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM descuento order by id_descuento DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})


//* RETIRO ENDPOINT */
// agregar retiro con FILE

app.post('/retiro', upload.single('comprobanteFile_retiro'), (req, res) => {
  console.log('Datos recibidos en el backend:', req.body);
  try {
    const id_ingreso = req.body.id_ingreso;
    const nombre_retiro = req.body.nombre_retiro;
    const rut_retiro = req.body.rut_retiro;
    const comprobanteFile_retiro = req.file; // multer añadirá el archivo a req.file
    const descripcion_retiro = req.body.descripcion_retiro;

    // Guardar el archivo en la base de datos (si es necesario)
    // Puedes almacenar el archivo en el sistema de archivos o en la base de datos según tus necesidades.

    // Realizar la consulta SQL para insertar los datos
    const sql = 'INSERT INTO retiro (id_ingreso, nombre_retiro, rut_retiro, comprobanteFile_retiro, descripcion_retiro) VALUES (?, ?, ?, ?, ?)';
    const values = [id_ingreso, nombre_retiro, rut_retiro, comprobanteFile_retiro.filename, descripcion_retiro];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al realizar la consulta SQL:', err);
        res.status(500).send({
          status: 500,
          message: 'Error interno del servidor',
          error: err.message,
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'RETIRO CREADO CON ÉXITO',
          data: result,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
});




/* app.post('/retiro', (req, res) => {
  const id_ingreso = req.body.id_ingreso;
  const nombre_retiro = req.body.nombre_retiro;
  const rut_retiro = req.body.rut_retiro;
  const comprobanteFile_retiro = req.body.comprobanteFile_retiro;
  const descripcion_retiro = req.body.descripcion_retiro;
  
  db.query(
    `INSERT INTO retiro (id_ingreso,nombre_retiro,rut_retiro,comprobanteFile_retiro,descripcion_retiro) VALUES(?,?,?,?,?)`,[id_ingreso,nombre_retiro,rut_retiro,comprobanteFile_retiro,descripcion_retiro],
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: err
        });
      } else {
        res.status(201).send({
          status: 201,
          message: 'RETIRO CREADO CON EXITO',
          data: result
        });
      }
    }
  );
}); */

// lista  todas las retiros
app.get('/retiro/all/:page/:limit' ,(req,res)=>{
  const page = req.params.page
  const limit = req.params.limit
  const start = (page - 1) * limit
  
  db.query(`SELECT * FROM retiro order by id_retiro DESC limit ${start}, ${limit}`,
  (err,result) => {
      if (result.length >0){
          res.status(200)
          .send(result)
      }else{
      res.status(400).send({
          message: 'NO EXISTE DATOS',
      
      })
      }

  }
  );

})