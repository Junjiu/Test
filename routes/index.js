var express = require('express');
var router = express.Router();
var dataGenerator = require('../dataGenerator/dataGenerator');
dataGenerator = new dataGenerator();
/* GET home page. */
router.get('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send(dataGenerator.getData());
});

module.exports = router;
