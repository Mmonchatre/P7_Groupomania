module.exports = app => {
    
    const users = require("../controllers/user.controller");

    var router = require("express").Router();
  

    // Create and login User
    router.post("/signup", users.signup);
    router.get("/login", users.login);

    // Create a new User
    //router.post("/", users.create);
  
    // Retrieve all Users 
    //router.get("/", users.findAll);
  
    // Retrieve all Admin Users
    //router.get("/users/admin", users.findAllAdmin);
  
    // Retrieve a single user with id
    //router.get("/:id", users.findOne);
  
    // Update a user with id
    //router.put("/:id", users.update);
  
    // Delete a user with id
    //router.delete("/:id", users.delete);
  
    app.use('/api/users', router);
  };
  