var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js');

const uploadFile = require('../middlewares/uploadFile'); 

//8 json
/* GET users listing. */
//router.get('/nour',usercontrolleur.hello) ;
//router.get('/',function(req,res,next){
  //  res.status(200).json('index',{title:'Express'});

//});
router.get('/getAllUsers',userController.getAllUsers);
router.delete('/deleteUserByID/:id',userController.deleteUserByID);
router.post('/addUser',userController.addUser);

router.post('/confirmPassword',userController.confirmPassword);
router.post('/addUserWithImg', uploadFile.single("image_User"),userController.addUserWithImg);
router.put('/updateUser/:id',userController.updateUser);
//router.get('/getUserById/:id',userController.getUserById);


module.exports = router;
