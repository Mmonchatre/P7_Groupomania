const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models"); // models path depend on your structure
const { Op } = require("sequelize"); // ajouter suite a erreur Op inconnu pour le test sur titre contenant valeur.
const User = db.users;

exports.signup = (req, res, next) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }
  // Create a user
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = {
      username: req.body.username,
     email: req.body.email,
     password: hash,
     isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
   };
  // save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
  })
};

exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "email can not be empty!"
    });
    return;
  }
  const email = req.body.email;
  console.log ('email=', req.body.email);
  
  User.findOne({
    where: {
      email: email,
    },
  })
    .then(
      user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'incorrect password!' });
            }
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '1h' }
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
      }
    )
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });

};



/*
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
*/

/*
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };
*/

/*  exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
*/

/*
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

*/

/*
  exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };
*/  

/*
  exports.findAllAdmin = (req, res) => {
    User.findAll({ where: { isAdmin: true } })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving users."
    });
    });
};
*/