const db = require('../models');

const User = db.user;

const Op = db.Sequelize.Op;

// Create user
exports.create = (req, res) => {
    //validation
    if(!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //create a user
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    //Save user in db
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating User."
            });
        });
};

// Retrieve all usrs from the database.
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving User."
            });
        });
}

exports.find = (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    var checkUsername = {username:  req.body.username};
    var checkPassword = {password:  req.body.password};
    User.findAll({where: {[Op.and]: [checkUsername, checkPassword]}, raw: true})
        .then(data => {
            if(data.length > 0)
                res.send(data[0]);
            else
                res.send({});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving milk amount."
            });
        });
}



