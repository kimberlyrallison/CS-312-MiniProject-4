import express from "express";
import session from 'express-session';

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'Kimberly',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())

var posts = [
    {
        id: 0,
        name:'Edna',
        date: new Date(),
        title: 'My Second Blog Post',
        content: 'I loved posting my first blog post so much that I had to post a second! This is the best blog ever.'
    },
    {
        id: 1,
        name:'Bob',
        date: new Date(),
        title: 'My First Blog Post',
        content: 'This is my first blog post!'
    },
    {
        id: 2,
        name:'Bob',
        date: new Date(),
        title: 'My Second Blog Post',
        content: 'I loved posting my first blog post so much that I had to post a second! This is the best blog ever.'
    }
]

var users = [
    {
        id: 1,
        username:'Bob',
        password:'password'
    },
]

// main home page
app.get("/api/posts", (req, res) => {
    // get user information
    const user = req.session.user;
    console.log(user);

    // if the user is not logged in, send to login page
    if (!user){
        res.status(401).send("Unauthorized");
    }
    else {
        // else, send the posts back to ther user
        res.send(JSON.stringify(posts));
    }
});

app.post("/api/login", (req,res) => {
    // check for the user
    const foundUser = users.find(user=>user.username===req.body.username && user.password===req.body.password)
    
    if(foundUser){
        req.session.user = foundUser;
        res.status(200).send("OKAY");
    }
    else {
        res.status(403).send("Invalid credentials");
    }
})

app.post("/api/register", (req, res) => {
    console.log(users)
    // check if credentials are in users
    const foundUser = users.find(user=>user.username===req.body.username)

    console.log(req.body)
    // check if found
    if(!foundUser){
        // register
        //console.log(req)
        users.push(req.body);
        console.log(users)
        res.status(200).send("OKAY");
    }
    else {
        res.status(400).send("User already exists");
    }
})

app.post("/api/delete", (req,res) => {
    // check for the user
    const user = req.session.user;
    const post = posts.find(post=>post.id===req.body.postID)
  
    if( user.username === post.name )
    {
        posts = posts.filter(post=>post.id!=req.body.postID);
        console.log(posts);
        res.status(200).send("OKAY");
    }
    else
    {
        res.status(403).send("Can't delete a post that is not yours");
    }
})

// retrieve posts
app.get("/api/getPost", (req, res) => {
    var post = posts.find(post => post.id === parseInt(req.query.id));
    console.log(post);
    res.send(post);
})

app.post("/api/save", (req, res) => {

    // add new post
    const post = req.body.post;
    console.log(req.body.post);
    console.log(post);
    post.date = new Date();

    const index = posts.findIndex(blog => blog.id == post.id)
     
    const user = req.session.user;
    if( post.id && user.username != post.name )
    {
        res.status(403).send("Can't edit a post that is not yours");
    }
    else
    {
        // if post does not exist
        if(index < 0) {
            post.id=new Date().getMilliseconds()
            post.name=req.session.user.username;
            posts.push(post);
            console.log(posts);
        }
        // if editing post that does exist
        else {
            posts[index] = post;
        }

        res.status(200).send("OKAY");
    }
});

app.listen(port, () => {
 console.log(`Server running on port ${port}.`);
});
