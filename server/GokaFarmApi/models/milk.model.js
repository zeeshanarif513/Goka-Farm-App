
module.exports = (sequelize, Sequelize) => {
    const Milk = sequelize.define("milk", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cowId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }
    });
    return Milk;
}