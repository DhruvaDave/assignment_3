const express = require('express');
const router = express.Router();

const Movie = require('../models/got.model');


router.post("/project/create",(req,res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const movie = new Movie({
        title: req.body.title,
        location: req.body.location,
        timing: req.body.timing,
    });
    movie
        .save(movie)
        .then(result => {
            res.send(result);
        })
        .catch(err =>{
        });
});

router.get("/project/findAll",(req,res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
});


router.get("/project/:id",(req,res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
});


router.put("/project/update/:id",(req,res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id
      });
    });
});


router.delete("/project/delete/:id",(req,res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      } else {
        res.send({
          message: "Movie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
});

router.delete("/project/deleteAll",(req,res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies."
      });
    });
});



exports.readTask = (req, body) => {
    Task.findById(req.params.taskid, (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    });
  };


module.exports = router;