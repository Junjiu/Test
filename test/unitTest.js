var assert = require('assert');
var dataGenerator = require('../dataGenerator/dataGenerator');
dataGenerator = new dataGenerator();

describe('DataGenerator', function() {
  describe('simulator', function() {
    it('check if data is generated successfully', function() {
        assert.equal(dataGenerator.createVehicle("V1"), 1);
    }),

    it('check if data can be get successfully', function() {
        dataGenerator.createVehicle("V2");
        var data = dataGenerator.getData("V2",1);
        assert.equal(data['success'], 1);
    }),
    
    it('check if the simulating data can be get successfully', function() {
        assert.equal(dataGenerator.getRecord(() => {}), 1);
    })
  }
  );
});

describe('DataGenerator', function() {
    describe('Real Data', function() {
      it('check if the real data can be generated', function() {
          assert.equal(dataGenerator.getRealRecord(() =>{}), 1);
      }),
  
      it('check if data can be get successfully', function() {
          dataGenerator.createVehicle("V2");
          var data = dataGenerator.getData("V2",1);
          assert.equal(data['success'], 1);
      }),
      it('check if can start demo successfully', function() {
          dataGenerator.startDemo();
          assert.equal(dataGenerator.demo(), 1);
      }),
      it('check if can end demo successfully', function() {
        dataGenerator.endDemo();
        assert.equal(dataGenerator.demo(), 0);
    }),
      it('check if can get real weather', function() {
        dataGenerator.endDemo();
        assert.equal(dataGenerator.getWeather([]), 1);
      }),
      it('check if can get demo weather', function() {
        dataGenerator.startDemo();
        assert.equal(dataGenerator.getWeather([]), 1);
      }),
      it('check if can one real record', function() {
        assert.equal(dataGenerator.getOneRealRecord(0,0,()=>{}), 1);
      }),
      it('check if can  real record by time', function() {
        assert.equal(dataGenerator.getRealRecordByTime(0,0,()=>{}), 1);
      })
    }
    );
  });