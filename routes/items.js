const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth');
const photo = require('../middlewares/upload');
const Controller = require('../controller/itemController');

router.post('/upload' ,Auth.cekJwt, photo.multer.single('image'), photo.upload, Controller.createNewItem);
router.post('/buy/:id', Controller.buyItem);
router.put('/update/:id', Controller.updateItem);
router.delete('/delete/:id', Controller.deleteItem);
router.get('/allitem',Controller.readAllItem);

module.exports = router;
