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
	var isDemo = 0;

	var request = require("request")
	var temperature = 0;
	var tempUrl = "http://api.openweathermap.org/data/2.5/weather?id=4670666&appid=7194a64fb174b7c732dc1ae9a166d9ae";
	request({
		url: tempUrl,
		json: true
	    }, function (error, response, body) {
		temperature = body['main']['temp']
	    })
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
	this.getWeather = function(results){
		for(var i = 0; i < results.length; ++i){
			results[i]['temp'] = (temperature - 273.15) * 9 / 5 + 32
			results[i]['tempTrend'] = 0
			results[i]['snow'] = 0
			results[i]['Frz.rain'] = 0
			results[i]['sleet'] = 0
			results[i]['condition'] = -1
		}
		console.log("is demo")
		console.log(isDemo)
		if(isDemo){
			if(1){
				for(var i = 0; i < results.length; ++i){
					results[i]['temp'] = Math.random()*50 - 10
					results[i]['tempTrend'] = Math.floor(Math.random()*100) % 2
					if(results[i]['temp'] > 30 && results[i]['tempTrend'] == 1){
						if(Math.floor(Math.random()*100) % 2 == 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 0
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 1
						}
					}
					if(results[i]['temp'] > 30 && results[i]['tempTrend'] == 0){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 2
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 3
						}
					}
					if(results[i]['temp'] > 25 && results[i]['temp'] < 30 && results[i]['tempTrend'] == 1){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 4
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 5
						}
					}
					if(results[i]['temp'] > 25 && results[i]['temp'] < 30 && results[i]['tempTrend'] == 0){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 6
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 7
						}
					}
					if(results[i]['temp'] > 20 && results[i]['temp'] < 25 && results[i]['tempTrend'] == 1){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 8
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 8
						}
					}
					if(results[i]['temp'] > 20 && results[i]['temp'] < 25 && results[i]['tempTrend'] == 0){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 9
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 10
						}
					}
					if(results[i]['temp'] > 15 && results[i]['temp'] < 20 && results[i]['tempTrend'] == 1){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 11
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 12
						}
					}
					if(results[i]['temp'] > 15 && results[i]['temp'] < 20 && results[i]['tempTrend'] == 0){
						if(Math.floor(Math.random()*100) % 2== 0){
							results[i]['snow'] = 1
							results[i]['condition'] = 13
						}else{
							results[i]['Frz.rain'] = 1
							results[i]['condition'] = 13
						}
					}
					if(results[i]['temp'] > 0 && results[i]['temp'] < 15){
						results[i]['snow'] = 1
						results[i]['condition'] = 14
					}
					if(results[i]['temp'] < 0){
						results[i]['snow'] = 1
						results[i]['condition'] = 15
					}
					result[i]['temp'] == result[0]['temp']
					result[i]['snow'] == result[0]['snow']
					result[i]['Frz.rain'] == result[0]['Frz.rain']
					result[i]['Frz.condition'] == result[0]['Frz.condition']
				}
				
			}
		}

	};
	  this.getOneRealRecord = function(startCounts, range, callback) {
		var self = this
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
					
					self.getWeather(results);
	
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
	this.startDemo = function(){
		isDemo = 1
	};
	this.endDemo = function(){
		isDemo = 0
	};
	this.route = function(waypoints, callback){
		var routeUrl = 'https://maps.googleapis.com/maps/api/directions/json?'
		routeUrl += 'origin=' + waypoints[0]
		routeUrl += '&destination=' + waypoints[1]
		if(waypoints.length >= 3){
			routeUrl += '&waypoints=' 
		}
		for(var i = 2; i < waypoints.length; ++i){
			routeUrl += '|via:' + waypoints[i]
		}
		routeUrl += '&key=AIzaSyDr__FR7kRgNkkgw-k8boWw5t5x0ehR9nY'
		console.log(routeUrl)
		request({
			url: routeUrl,
			json: true
		    }, function (error, response, body) {
			console.log(body)
			steps = body['routes'][0]['legs'][0]['steps']
			points = []
			points.push(body['routes'][0]['legs'][0]['start_location'])
			console.log(body['routes'][0]['legs'][0])
			for(var i = 1; i < steps.length; ++i){
				points.push(steps[i]['end_location'])
			}
			callback(points)
		    })
	};

};
module.exports = dataGenerator;
