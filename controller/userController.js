const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = {
  createUser:(req,res)=>{
    console.log(req.body);
    var newUser = new User({
      name : req.body.name,
      username : req.body.name,
      password : req.body.password,
      email: req.body.email,
      admin : false
    });
    newUser.save()
    .then((value) => {
      res.status(201).json({
        message:'user berhasil dibuat',
        value
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'user gagal dibuat ada yang tidak lengkap'
      });
    });
  },

  loginUser:(req,res)=>{
    User.findOne({username:req.body.username})
    .then((dataUser) => {
      var cekLogin = bcrypt.compareSync(req.body.password,dataUser.password);
      if(cekLogin){
        var admin = dataUser.admin;
        var token = jwt.sign({id:dataUser._id,username:dataUser.username},process.env.jwtSecret);
        res.status(200).json({
          message:'sukses login',
          token, admin

        });
      }else{
        res.status(400).json({
          message: 'password anda salah'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:'username yang anda masukan belom terdaftar'
      });
    });
  }
};
