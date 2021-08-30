
module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }
    });
    return Expense;
}