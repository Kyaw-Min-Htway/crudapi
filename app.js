const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware 
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect('mongodb://localhost:27017/apitest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Define Mongoose Schema
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);

//Crud Operations
//Create
app.post('/items', async(req, res)=>{
    try{
        const newItem = new Item(req.body);
        await newItem.save();
        res.json(newItem);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//Read
app.get('/items', async(req,res)=>{
    try{
        const items = await Item.find();
        res.json(items);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

//Update
app.put('/items/:id', async(req, res)=> {
    try{
        const UpdatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(UpdatedItem);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//Delete
app.delete('/items/:id0', async(req, res)=>{
    try{
        await Item.findByIdAndDelete(req.params.id);
        res.json({message: 'Item deleted successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//Start the server

app.listen(PORT, ()=>{
    console.log("Server is running at 3000");
})