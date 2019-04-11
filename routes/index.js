var express = require('express');
var router = express.Router();
var dataGenerator = require('../dataGenerator/dataGenerator');
dataGenerator = new dataGenerator();
/* GET home page. */
  dataGenerator.createVehicle("V1");
  dataGenerator.createVehicle("V2");
  dataGenerator.createVehicle("V3");
router.get('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	var result = [];
	result.push(dataGenerator.getData("V1",1));
	result.push(dataGenerator.getData("V2",2));
	res.send(result);
});

router.get('/getOneRealRecord', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        dataGenerator.getOneRealRecord([0,600,1200,1800], 500, (d) =>{
		res.send(d);
	});
});

router.get('/record', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
	dataGenerator.getRecord( (d) =>{
		var ave = 0;
		  for(var i = 0; i < d.length; ++i){
                d[i]['total_accel'] = Math.sqrt(d[i]['X_accel']*d[i]['X_accel']
		+ d[i]['Y_accel']*d[i]['Y_accel'] + d[i]['Z_accel']*d[i]['Z_accel']);
       		ave += d[i]['total_accel'];
		d[i]['ave_accel'] = ave /(i+1);	  
		  }	
		res.send(d);
	});
});
router.get('/realrecord', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	 dataGenerator.getRealRecord( (d) =>{
                res.send(d);
        });
});
router.get('/realrecordbytime', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         dataGenerator.getRealRecordByTime(req.query.startDate, req.query.endDate, (d)  =>{
                res.send(d);
        });
});
module.exports = router;

