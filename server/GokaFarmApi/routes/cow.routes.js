module.exports = app => {
    const cows = require('../controllers/cow.controller');

    var router = require("express").Router();

    //Create a new Cow
    router.post("/", cows.create);

    //Retrieve all Cows
    router.get("/", cows.findAll);

    //Retrieve a Cow with id
    router.get("/:id", cows.findOne);

    app.use('/api/cows', router);
}