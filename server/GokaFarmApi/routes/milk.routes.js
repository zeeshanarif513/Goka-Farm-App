module.exports = app => {
    const milk = require('../controllers/milk.controller');

    var router = require("express").Router();

   
    router.post("/", milk.create);

   
    router.get("/", milk.findAll);

    router.post("/find", milk.find);

    
    router.get("/:id", milk.findOne);
    //router.get("/name/n", milk.find);

    app.use('/api/milk', router);
}