const Item = require('../models/itemSchema');
const dotenv = require('dotenv').config();

module.exports = {

  createNewItem:(req,res)=>{
    var newItem = new Item({
      image : req.file.imageURL,
      item : req.body.item,
      stock : +(req.body.stock),
      price : +(req.body.price),
      description: req.body.description
    });
    newItem.save()
    .then((dataItem) => {
      res.status(201).json({
        message:'berhasil membuat item baru',
        dataItem
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message:'gagal membuat item baru terjadi kesalahan'
      });
    });
  },

  updateItem:(req,res)=>{
    Item.findOneAndUpdate({_id:req.params.id},{
      item : req.body.item,
      description : req.body.description,
      stock : +(req.body.stock),
      price : +(req.body.price)
    })
    .then((itemUpdate) => {
      res.status(200).json({
        message:'data berhasil di update',
        itemUpdate
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message:'gagal update data terjadi kesalahan',
      });
    });
  },

  deleteItem:(req,res)=>{
    Item.findOneAndDelete({_id:req.params.id})
    .then((deleteItem) => {
      res.status(200).json({
        message: 'delete success'
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'delete gagal'
      });
    });
  },

  buyItem:(req,res)=>{
    console.log(req.body);
    Item.findOneAndUpdate({_id:req.params.id},{
      stock : +(req.body.stock)
    })
    .then((itemUpdate) => {
      res.status(200).json({
        message:'data berhasil di update',
        itemUpdate
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message:'gagal update data terjadi kesalahan',
      });
    });
  },

  readAllItem:(req,res)=>{
    Item.find()
    .then((dataItem) => {
      res.status(200).json({
        message:'berhasil kirim item',
        dataItem
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'gagal mendapatkan data item'
      });
    });
  }
};
