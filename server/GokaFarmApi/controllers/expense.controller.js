const db = require('../models');

const Expense = db.expenses;

const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    //validation
    if(!req.body.category || !req.body.type || !req.body.amount, !req.body.date) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const expense = {
        category: req.body.category,
        type: req.body.type,
        amount: req.body.amount,
        date: req.body.date
    }

    
    Expense.create(expense)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating expense."
            });
        });
};


exports.findAll = (req, res) => {
    Expense.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving."
            });
        });
}

exports.find = (req, res) => {
    // console.log(req.body);
    // const n = req.body.name;
   
    var categoryFilter = req.body.category? {category:  req.body.category}: null;
    var expenseFilter = req.body.expense? {type: req.body.expense}: null;
    var startRangeFilter = req.body.startDate ? {
        date: {
            [Op.gte]: new Date(req.body.startDate)
        }
    }: null;
    var endRangeFilter = req.body.endDate ? {
        date: {
            [Op.lte]: new Date(req.body.endDate)
        }
    }: null;
    Expense.findAll({where: {[Op.and]: [categoryFilter, expenseFilter, startRangeFilter, endRangeFilter]}, raw: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving milk amount."
            });
        });
}


exports.findOne = (req, res) => {
    const id = req.params.id;

    Expense.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving ."
            });
        });
}


exports.update = (req, res) => {
  
};


exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

