require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');

const app = express();
app.use(express.json());

app.post('/blogs', async(req, res) => {
    const blogs = new Blog(req.body);
    try {
        await blog.save();
        res.status(201).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }

    // Blog.create(req.body).then((blog) => {
    //     res.status(201).send(blog);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })

    // Blog.insertMany(req.body).then((blog) => {
    //     res.status(201).send(blog);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
})

app.get('/blogs', async(req,res) => {
    // Blog.find({}).then((blogs) => {
    //     res.send(blogs);
    // }).catch((err) => {
    //     res.status(500).send(err);
    // })

    try{
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
       }catch (err){
        res.status(500).send(err);
       }
})

app.get('/blogs/:id', async(req,res) => {
    // Blog.findOne({_id: req.params.id}).then((blog) => {
    //     if (!blog) {
    //         return res.status(404).send();
    //     }
    //     res.send(blog);
        
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })

   try{
    const blogs = await Blog.findById(req.params.id);
    if(!blog){
        return res.status(404);
    }
    res.status(200).send(blogs);
   }catch(err){
    res.status(500).send(err);
   }
})

app.patch('/blogs/:id', async(req,res) => {
        try{
            const blogs = await Blog.findById(req.params.id, req.body, {new: true});
            if(!blog){
                return res.status(404);
            }
            res.status(200).send(blogs);
           }catch(err){
            res.status(500).send(err);
           }

    // Blog.updateOne({_id: req.params.id}, req.body).then(response => {
    //     res.status(200).send(response);
    // }).catch(error => {
    //     res.status(500).send(error);
    // }) 
})

app.delete('/blogs/:id', async(req, res) => {
    // Blog.findByIdAndDelete(req.params.id).then((blog) => {
    //     if(!blog) {
    //         return res.status(404).send();
    //     }
    //     res.send(blog);
    // }).catch(error => {
    //     res.status(500).send(error);
    // }) 

    try{
        const blogs = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404);
        }
        res.status(200).send(blogs);
       }catch(err){
        res.status(500).send(err);
       } 
})


app.listen(3000, (req,res)=> {
    console.log('app is running at the port 3000');
})
