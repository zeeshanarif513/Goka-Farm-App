const { sequelize } = require('../models');
const db = require('../models');

const Milk = db.milk;

const Op = db.Sequelize.Op;

// Create and Save a new Milk amount
exports.create = (req, res) => {
    //validation
    if(!req.body.amount || !req.body.date) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //create milk amount
    const milk = {
        cowId: req.body.cowId,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date
    }

    //Save milk amount in db
    Milk.create(milk)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating milk amount."
            });
        });
};

// exports.find = (req, res) => {
//     console.log(req.params.name);
//     const n = req.params.name;
//     //var condition = n? {name: { [Op.eq]: n}}: null;
    
//     Milk.findAll({ where: {[Op.eq]: [{
//         name: n
//     }]} }) 
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occured while retrieving ."
//             });
//         });
// }

// Retrieve all milk amounts from the database.
exports.findAll = (req, res) => {
    
    Milk.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving milk amount."
            });
        });
}

exports.find = (req, res) => {
    console.log(req.body);
    const n = req.body.name;
    var condition = n? {name:  n}: null;
    var startRange = req.body.startDate ? {
        date: {
            [Op.gte]: new Date(req.body.startDate)
        }
    }: null;
    var endRange = req.body.endDate ? {
        date: {
            [Op.lte]: new Date(req.body.endDate)
        }
    }: null;
    Milk.findAll({where: {[Op.and]: [condition, startRange, endRange]}, raw: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving milk amount."
            });
        });
}

// Find a milk maount with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Milk.findByPk(id)
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


