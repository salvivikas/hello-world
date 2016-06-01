"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/database.json')[env];

var sequelize = new Sequelize(config.database, config.username, config.password, config);
/*
var sequelize = new Sequelize("ToDo", "postgres", "abcd@1234", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
*/
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
