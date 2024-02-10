require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');

const app = express();
app.use(express.json());

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((blog) => {
        res.status(201).send(blog);
    }).catch((error) => {
        res.status(400).send(error);
    })

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

app.get('/blogs', (req,res) => {
    Blog.find({}).then((blogs) => {
        res.send(blogs);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.get('/blogs/:id', (req,res) => {
    // Blog.findOne({_id: req.params.id}).then((blog) => {
    //     if (!blog) {
    //         return res.status(404).send();
    //     }
    //     res.send(blog);
        
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })

    Blog.findById(req.params.id).then((blog) => {
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.patch('/blogs/:id', (req,res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
        if(!blog){
            return res.status(404).send();
        }
        res.send(blog);
    }).catch((err) => {
        res.status(500).send(err);
    })
})


app.listen(3000, (req,res)=> {
    console.log('app is running at the port 3000');
})
