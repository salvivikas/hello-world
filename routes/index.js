var express = require('express');
var router = express.Router();
var models = require('../models/index');
var path = require('path');
var appRoot = require('app-root-path');

var rootPath = function (req, res, next) {
  req.rootPath = path.dirname(require.main.filename);
  next();
};

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(appRoot.path, 'views', 'home.html'));
});

// Get all todos
router.get('/task', function (req, res) {
  models.Tasks.all().then(function (taskList) {
    //res.render('index', {tasks: taskList});
    res.json(taskList);
  });
});

// Insert
router.post('/task', function (req, res) {
  var task = req.body.taskName;
  models.Tasks
    .build({
      Title: req.body.taskName,
      Complete: false
    })
    .save()
    .then(function () {
      res.send('success');
    },
    function (err) {
      res.send('error');
    });
});

// Update
router.put('/task/:id', function (req, res) {
  models.Tasks.find({
    where: {
      Id: req.params.id
    }
  }).then(function (task) {
    if (task) {
      task.updateAttributes({
        Title: req.body.taskName,
        Complete: req.body.complete
      }).then(function (task) {
        res.send('success');
      });
    }
  });
});

// Delete
router.delete('/task/:id', function (req, res) {
  models.Tasks.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (task) {
    res.send('success');
  }, function (err) {
    res.send('error');
  });
});
module.exports = router;
