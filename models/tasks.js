"use strict"

module.exports = function(sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
       tableName: 'Tasks'
    });

    return Tasks;
}