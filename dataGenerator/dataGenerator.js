function dataGenerator() {
	this.getData = function() {
		var data = {};
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		data['time'] = year + "/" + month + "/" + day;;
                data['Lat'] = Date.now() % 10 + 42;
		data['Long'] = ((Date.now() * 2) % 10) - 93;
		data['Alt'] = Date.now() % 300;
		data['GPS_head'] = 0;
		data['X_accel'] = Date.now() % 600;
		data['Y_accel'] = Date.now() % 600;
		data['Z_accel'] = Date.now() % 600;
		data['Acc_mag'] = Date.now() % 1000;
		data['Conveyor'] = Date.now() % 50;
		data['Spinner'] = Date.now() % 50;
		data['Prewet'] = Date.now() % 50;
		return data;
	};
};
module.exports = dataGenerator;
