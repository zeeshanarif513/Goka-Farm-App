module.exports = app => {
    const expense = require('../controllers/expense.controller');

    var router = require("express").Router();

   
    router.post("/", expense.create);

   
    router.get("/", expense.findAll);

    router.post("/find", expense.find);

 
    router.get("/:id", expense.findOne);

    app.use('/api/expenses', router);
}