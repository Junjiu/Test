function dataGenerator() {
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	var x = 42;
        var y = -93;
	var vehicle = {};
	this.createVehicle = function(name){
		vehicle[name] = {};
		vehicle[name]['Lat'] = 42;
		vehicle[name]['Long'] = -91;
	};
	var count = 0;
	var savedlocations = {};
	this.getData = function(name, seed) {

		var data = vehicle[name];
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		data['time'] = year + "/" + month + "/" + day;;
		data['Lat'] = data['Lat'] + (Math.random()  *  10) * seed / 1000;
		data['Lat'] = data['Lat'];
		data['Long'] = data['Long'] +  (Math.random()  *  10 % 10) * seed  / 1000;
		data['Long'] = data['Long'];
		data['Alt'] = Math.random()  * 300 * seed;
		data['GPS_head'] = Math.random()  * 600 * seed;
		data['X_accel'] = Math.random()  * 600 * seed;
		data['Y_accel'] = Math.random()  * 600 * seed;
		data['Z_accel'] = Math.random()  *600 * seed;
		data['Acc_mag'] = Math.random()  *1000 * seed;
		data['Conveyor'] = Math.random()  *50 * seed;
		data['Spinner'] = Math.random()  *50 * seed;
		data['Prewet'] = Math.random()  *50 * seed;
		vehicle[name] = data;
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("record");
		       	dbo.collection("truck").insertOne(data, function(err, res) {
					if (err) throw err;
			       		db.close();	
			});	

	       });
	       return data;
	};
	this.getRecord = function(callback) {
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
				if (err) throw err;
				var dbo = db.db("record");
				dbo.collection("truck").find().toArray(function(e, d){
					db.close();
					callback(d);
				});	
		});
	};
	 this.getRealRecord = function(callback) {
                MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                                if (err) throw err;
                                var dbo = db.db("realRecord");
                                dbo.collection("record").find().limit(500).toArray(function(e, d){
                                        db.close();
                                        callback(d);
                                });
                });
        };
	  this.getOneRealRecord = function(startCounts, range, callback) {
                MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                                if (err) throw err;
                                var dbo = db.db("realRecord");
                                dbo.collection("record").find().limit(3000).toArray(function(e, d){
                                        db.close();
					var results =[];
					for(var j = 0; j < startCounts.length; ++j){
						startCount = startCounts[j];
						startCount = parseInt(startCount);
						temp = d.slice(startCount + count%range, startCount + count%range + 4);
						var result = temp[0];
						for(var i = 1; i < temp.length; i = i + 1){
							for(var key in temp[i]){
								var str = String(temp[i][key]);
								if(str.length != 0){
									result[key] = temp[i][key]
								}
							}	
						}
						console.log(String(savedlocations[j]).length);
						var locationJSON ={}
						try{
							locationJSON = JSON.parse(result['Hanover Park IL TGS - Location ()']);
							for(var key in locationJSON){
								result[key] = locationJSON[key];
							}	
							savedlocations[j] = locationJSON;
						}catch(e){
							console.log("=====");
							console.log(String(savedlocations[j]).length);
							console.log('catch exception');
						 	 for(var key in savedlocations[j]){
                                                                result[key] = savedlocations[j][key];
                                                        }	
						}
						results.push(result);
					}	
					count += 4;
					callback(results);
                                });
		});
        };
	 this.getRealRecordByTime = function( startDate, endDate, callback) {
                MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                                if (err) throw err;
                                var dbo = db.db("realRecord");
				var filter = {'timestamp' : {$gt:startDate, $lt:endDate}};
                                dbo.collection("record").find(filter).limit(500).toArray(function(e, d){
                                        db.close();
                                        callback(d);
                                });
                });
        };

};
module.exports = dataGenerator;
