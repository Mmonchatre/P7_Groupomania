module.exports = app => {
    
  const auth = require('../middleware/auth');
  const multer = require('../middleware/multer-config');
    const posts = require("../controllers/post.controller");
    var router = require("express").Router();
  

    // Create a new post

    router.post("/", auth, multer, posts.create);
  
    // Retrieve all posts
    router.get("/", auth, posts.findAll);
  
    // Retrieve all visibled posts
    router.get("/visible", auth, posts.findAllVisible);
  
    // Retrieve a single post with id
    router.get("/:id", auth, posts.findOne);
  
    // Update a post with id
    router.put("/:id", auth, posts.update);
  
    // Delete a post with id
    router.delete("/:id", auth, posts.delete);
  
    // delete all posts
    router.delete("/", auth, posts.deleteAll);
  
    app.use('/api/posts', router);
  };
  