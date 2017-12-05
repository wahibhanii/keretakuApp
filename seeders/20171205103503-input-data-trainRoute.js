'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('TrainRoutes', [{
        RouteId       : 1,
        TrainId       : 2,
        departureTime : new Date('2017-12-05T10:55:11.027Z'),
        arrivalTime   : new Date('2017-12-05T13:45:11.027Z'),
        quota         : 243,
        price         : 95000
      }, {
        RouteId       : 4,
        TrainId       : 3,
        departureTime : new Date('2017-12-05T02:55:11.027Z'),
        arrivalTime   : new Date('2017-12-05T08:23:11.027Z'),
        quota         : 356,
        price         : 392000
      }, {
        RouteId       : 3,
        TrainId       : 4,
        departureTime : new Date('2017-12-05T13:05:11.027Z'),
        arrivalTime   : new Date('2017-12-05T22:45:11.027Z'),
        quota         : 243,
        price         : 479000
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TrainRoutes', [{
      RouteId       : 1,
      TrainId       : 2,
      departureTime : new Date('2017-12-05T10:55:11.027Z'),
      arrivalTime   : new Date('2017-12-05T13:45:11.027Z'),
      quota         : 243,
      price         : 95000
    }, {
      RouteId       : 4,
      TrainId       : 3,
      departureTime : new Date('2017-12-05T02:55:11.027Z'),
      arrivalTime   : new Date('2017-12-05T08:23:11.027Z'),
      quota         : 356,
      price         : 392000
    }, {
      RouteId       : 3,
      TrainId       : 4,
      departureTime : new Date('2017-12-05T13:05:11.027Z'),
      arrivalTime   : new Date('2017-12-05T22:45:11.027Z'),
      quota         : 243,
      price         : 479000
    }]);
  }
};
