module.exports = app => {
    const movies = require("../routes/search.js");
  
    var router = require("express").Router();
  
    router.post("/", movies.create);

    app.use('/api/movies', router);
  };