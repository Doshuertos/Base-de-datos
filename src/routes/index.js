const {Router} = require('express');
const router = Router();
const {getUsers,CreateUser,getConejos,addconejo,DeleteUser,Actualizar_Clave,Actualizar_Telefono,CreateSolicitud,Actualizar_Estado,Razamax,Ver_Peticiones} = require('../controllers/index.controller.js')
router.get('/getUsers', getUsers);
router.get('/getConejos', getConejos);
router.post('/CreateUser', CreateUser);
router.post('/addconejo', addconejo);
router.delete('/DeleteUser', DeleteUser);
router.put('/Actualizar_Contrasena', Actualizar_Clave);
router.put('/Actualizar_Telefono', Actualizar_Telefono);
router.post('/CreateSolicitud', CreateSolicitud);
router.put('/Actualizar_Estado', Actualizar_Estado);
router.get('/Razamax', Razamax);
router.get('/Ver_Peticiones', Ver_Peticiones);

module.exports = router;