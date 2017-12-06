'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Transactions', [
      {
        TrainRouteId  : 1,
        UserId        : 15,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 2,
        UserId        : 15,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 3,
        UserId        : 15,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 1,
        UserId        : 14,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 1,
        UserId        : 13,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 1,
        UserId        : 16,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        TrainRouteId  : 2,
        UserId        : 16,
        departureTime : new Date(),
        seatReserved  : 1,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
    ]);
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
