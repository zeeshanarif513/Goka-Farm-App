
module.exports = (sequelize, Sequelize) => {
    const Cow = sequelize.define("cow", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        entranceDate: {
            type: Sequelize.DATE
        }
    });
    return Cow;
}