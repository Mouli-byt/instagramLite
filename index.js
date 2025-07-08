const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id:uuidv4(),
        image:"cat1",
        caption:"#this is cat1"
    },
     {
        id:uuidv4(),
        image:"cat2",
        caption:"#this is cat2"
    },
     {
        id:uuidv4(),
        image:"cat3",
        caption:"#this is cat3"
    }
];

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})



app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
  let post = posts.find((p)=> id == p.id );
   res.render("see.ejs",{post});
});



app.post("/posts",(req,res)=>{
    let {image,caption} = req.body;
    let newpost = {
        id:uuidv4(),
        image:image,
        caption:caption
    }
    posts.push(newpost);
    res.redirect("/posts");
})

app.get("/posts/edit/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
   let {image,caption} = req.body;
    let post = posts.find((p)=> id == p.id);
    post.image = image;
    post.caption = caption;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newPosts = posts.filter((p) => id !== p.id);
    posts = newPosts;
    res.redirect("/posts");

})


app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})