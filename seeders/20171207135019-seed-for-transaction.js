'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [{
      TrainRouteId: 2,
      UserId: 15,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 2,
      UserId: 16,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 2,
      UserId: 14,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 2,
      UserId: 13,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 1,
      UserId: 15,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 1,
      UserId: 16,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 1,
      UserId: 14,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      TrainRouteId: 1,
      UserId: 13,
      departureTime: new Date('2017-12-25T02:55:00.000Z'),
      seatReserved: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
