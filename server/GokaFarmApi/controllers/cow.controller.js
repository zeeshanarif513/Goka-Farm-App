const db = require('../models');

const Cow = db.cows;

const Op = db.Sequelize.Op;

// Create and Save a new Cow
exports.create = (req, res) => {
    //validation
    if(!req.body.name || !req.body.entranceDate) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //create a cow
    const cow = {
        name: req.body.name,
        entranceDate: req.body.entranceDate
    }

    //Save Cow in db
    Cow.create(cow)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Cow."
            });
        });
};

// Retrieve all Cows from the database.
exports.findAll = (req, res) => {
    Cow.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Cow."
            });
        });
}

// Find a single Cow with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cow.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Cow."
            });
        });
}

// Update a Cow by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Cow with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Cows from the database.
exports.deleteAll = (req, res) => {
  
};

