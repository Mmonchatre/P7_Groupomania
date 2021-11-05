const db = require("../models"); // models path depend on your structure
const { Op } = require("sequelize"); // ajouter suite a erreur Op inconnu pour le test sur titre contenant valeur.


const Post = db.posts;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  
  filename="bearnaise.jpg1633502411082.jpg";
console.log('filename=',`${req.protocol}://${req.get('host')}/app/images/${filename}`)
//  console.log('protocole=',`${req.protocol}`);
//  console.log('host=',`${req.get('host')}`);

  console.log('filename=',`${req.protocol}://${req.get('host')}/app/images/bearnaise.jpg1633502411082.jpg`)
  // Create a post
  const post = {
    content: req.body.content,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`,
    userId: req.body.userId,
    isVisibled: req.body.isVisibled ? req.body.isVisibled : true,
  };

  // Save post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    });
};

exports.findAll = (req, res) => {
    const userId = req.query.userId;
    
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;

    Post.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Post with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Post with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe post was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete post with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Posts were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all posts."
        });
      });
  };
  

  exports.findAllVisible = (req, res) => {
    Post.findAll({ where: { isVisibled: true } })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving posts."
    });
    });
};