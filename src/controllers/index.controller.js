const { Pool } = require('pg');
//se crear el bloque como una constante 
//configuracion para conectarse a postgres
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto',
    password: 'Conejo',
    port: '5432'
};

const pool = new Pool(config);

//funcion para hacer una consulta en prostgres
const getConejos = async (req,res) => {
    try{
        //se hace la consulta a la base de datos
        const response = await pool.query('select * from Conejos');
        //se imprimen unicamente las filas de la consulta (ya que si no se especifica imprime mas datos que no son necesarios).
        console.log(response.rows);
        res.json(response.rows);
    }catch(error){
        console.log(error);
    }
}
const getUsers =  async (req, res) => {
    try{
        const response = await pool.query('select * from Usuario');
        console.log(response.rows);
        res.json(response.rows);
    }catch(error){
        console.log(error);
    }
};

//funcion para insertar datos en postgres
const CreateUser = async (req, res) => {
    const {Nombre,Apellido,Rut,Correo,Telefono,Admin='false',Contrasena } = req.body;
 
    try{
        const existeUsuario1 = await pool.query('select Usuario.Rut FROM Usuario WHERE Rut = $1', [Rut]);
        const existeUsuario2 = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1', [Correo]);
        if(existeUsuario1.rowCount===1){
            console.log('Rut ya existente');
            res.json('Rut ya existente');
        }else if(existeUsuario2.rowCount===1){
            console.log('Correo ya existente');
            res.json('Correo ya existente');
        }else{
        const quer = await pool.query('INSERT INTO Usuario (Nombre,Apellido,Rut,Correo,Telefono,Admin,Contrasena) VALUES($1, $2, $3, $4, $5, $6, $7)',[Nombre,Apellido,Rut,Correo,Telefono,Admin,Contrasena]);
        console.log(quer);
        res.send('Usuario creado')
        res.json({
            message: 'Usuario creado exitosamente',
            body:{
                Usuario: {Nombre,Apellido}
            }
        });
    }
}catch(error){
        console.log(error);
}
    
}


const addconejo = async (req, res) => {
    const {Nombre,id_Raza,fecha_nacimiento,Sexo,fecha_llegada=Date.now()} = req.body;
    try{
        const quer = await pool.query('INSERT INTO Conejos (Nombre,id_Raza,fecha_nacimiento,Sexo,fecha_llegada) VALUES($1, $2, $3, $4, $5)',[Nombre,id_Raza,fecha_nacimiento,Sexo,fecha_llegada]);
        console.log(quer);
        res.send('Conejo añadido')
        res.json({
            message: 'Conejo añadido exitosamente',
            body:{
                Usuario: {Nombre,Apellido}
            }
        });
    }catch(error){
        console.log(error);
    }

}

//funcion para eliminar datos en postgres
const DeleteUser = async (req, res) => {
    const {Correo,Contrasena} = req.body;
    try{
        const existeUsuario2 = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1 and Contrasena = $2 ', [Correo,Contrasena]);
        if(existeUsuario2.rowCount===1) {
            const Eliminado = await pool.query('DELETE FROM Usuario WHERE Correo = $1', [Correo]);
            console.log(Eliminado);
            res.json('Usuario Eliminado');
        }else{
            console.log('Usuario No existe');
            res.json('Usuario No existe');
        }
    }catch(error){
        console.log(error);
    }
}   
//funcion para actualizar datos en postgres
const Actualizar_Clave = async (req, res) => {
    const {Correo,Contrasena,NewContrasena} = req.body;
    try{
        const existeUsuario2 = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1 and Contrasena = $2 ', [Correo,Contrasena]);
        if(existeUsuario2.rowCount===1) {
            const Actualizar = await pool.query('UPDATE Usuario SET Contrasena = $1  WHERE Correo = $2 ', [NewContrasena,Correo]);
            console.log(Actualizar);
            res.json('Contrasena Actualizado'); 
        }else{
            console.log('Usuario No existe');
            res.json('Usuario No existe');
        }
    }catch(error){
        console.log(error);
    }
}
const Actualizar_Telefono = async (req, res) => {
    const {Correo,Contrasena,NewTelefono} = req.body;
    try{
        const existeUsuario2 = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1 and Contrasena = $2 ', [Correo,Contrasena]);
        if(existeUsuario2.rowCount===1) {
            const Actualizar = await pool.query('UPDATE Usuario SET Telefono  = $1  WHERE Correo = $2 ', [NewTelefono,Correo]);
            console.log(Actualizar);
            res.json('Telefono Actualizado'); 
        }else{
            console.log('Usuario No existe');
            res.json('Usuario No existe');
        }
    }catch(error){
        console.log(error);
    }
}
const CreateSolicitud = async (req, res) => {
    const {Correo,Contrasena,id_Conejo,id_Usuario,fecha_Solicitud,id_Estado=1} = req.body;
    try{
        const existeconejo = await pool.query('select Conejos.ID_Conejo FROM Conejos WHERE id_Conejo= $1 ', [id_Conejo]);
        const Conejoenlistaconejo = await pool.query('select * FROM Solicitud WHERE id_Conejo= $1 and id_Estado = 1', [id_Conejo]);
        const Conejoenlistaconejo1 = await pool.query('select * FROM Solicitud WHERE id_Conejo= $1 and id_Estado = 3', [id_Conejo]);
        const existeUsuario2 = await pool.query('select Usuario.ID_Usuario FROM Usuario WHERE Correo = $1 and Contrasena = $2 ', [Correo,Contrasena]);
        if(existeUsuario2.rowCount===1){
            if(existeconejo.rowCount===1){
                if(Conejoenlistaconejo.rowCount===1 || Conejoenlistaconejo1.rowCount===1){ 
                    console.log('EL conejo ya esta en una solicitud');
                    res.json('EL conejo ya esta en una solicitud');
                }else{
                    const quer = await pool.query('INSERT INTO Solicitud (id_Conejo,id_Usuario,fecha_Solicitud,id_Estado) VALUES($1, $2, $3, $4)',[id_Conejo,id_Usuario,fecha_Solicitud,id_Estado]);
                    console.log(quer);
                    res.json('Peticion realizada'); 
                }
            }else{
                console.log('Id Conejo no encontrado');
                res.json('Id Conejo no encontrado');
            }
        }else{
            console.log('Usuario No existe');
            res.json('Usuario No existe');
    }
}catch(error){
        console.log(error);
}
}
const Actualizar_Estado = async (req, res) => {
    const {Correo,Contrasena,NewEstado,ID_Solicitud} = req.body;
    try{
        const existeUsuario2 = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1 and Contrasena = $2 ', [Correo,Contrasena]);
        if(existeUsuario2.rowCount===1) {
            const existeUsuario = await pool.query('select Usuario.Correo FROM Usuario WHERE Correo = $1 and Admin = true', [Correo]);
            if(existeUsuario.rowCount===1) { 
                const Actualizar = await pool.query('UPDATE Solicitud SET id_Estado = $1  WHERE ID_Solicitud = $2 ', [NewEstado,ID_Solicitud]);
                console.log(Actualizar);
                res.json('Estado Actualizado'); 
            }else{
                console.log('Solo los Administradores pueden cambiar el estado');
                res.json('Solo los Administradores pueden cambiar el estado');
            }
            
        }else{
            console.log('Usuario No existe');
            res.json('Usuario No existe');
        }
    }catch(error){
        console.log(error);
    }
}
const Razamax = async (req, res) => {
    try{
        const response = await pool.query('select Raza.Tipo_Raza,t3.count from (select max(count) from (select count(*) from Conejos group by Conejos.id_Raza) as t1) as t2 join (select count(*),Conejos.id_Raza from Conejos group by Conejos.id_Raza) as t3 on t3.count = t2.max join Raza on t3.id_Raza = Raza.ID_Raza');
        console.log(response.rows);
        res.json(response.rows);
    }catch(error){
        console.log(error);
  }
}
const Ver_Peticiones = async (req, res) => {
    try{
        const response = await pool.query('Select Usuario.nombre,Usuario.Apellido,Solicitud.ID_Solicitud,Estado_Solicitud.Descripcion from Usuario join Solicitud on Usuario.ID_Usuario = Solicitud.id_Usuario  join Estado_Solicitud on Estado_Solicitud.ID_Estado = Solicitud.id_Estado');
        console.log(response.rows);
        res.json(response.rows);
    }catch(error){
        console.log(error);
  }
}

//actualizar();
//hacer_consulta();
//insertar();
//eliminar();

//se exporta la funcion para que pueda ser usada en otro archivo
module.exports = {
    getUsers,
    CreateUser,
    getConejos,
    addconejo,
    DeleteUser,
    Actualizar_Clave,
    Actualizar_Telefono,
    CreateSolicitud,
    Actualizar_Estado,
    Razamax,
    Ver_Peticiones,
};