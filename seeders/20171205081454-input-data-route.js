'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Routes', [{
        departure: 'Jakarta',
        arrival: 'Surabaya'
      },{
        departure: 'Jakarta',
        arrival: 'Bandung'
      },{
        departure: 'Jakarta',
        arrival: 'Yogyakarta'
      },{
        departure: 'Surabaya',
        arrival: 'Jakarta'
      },{
        departure: 'Surabaya',
        arrival: 'Bandung'
      },{
        departure: 'Surabaya',
        arrival: 'Yogyakarta'
      },{
        departure: 'Bandung',
        arrival: 'Yogyakarta'
      },{
        departure: 'Bandung',
        arrival: 'Jakarta'
      },{
        departure: 'Bandung',
        arrival: 'Surabaya'
      },{
        departure: 'Yogyakarta',
        arrival: 'Jakarta'
      },{
        departure: 'Yogyakarta',
        arrival: 'Surabaya'
      },{
        departure: 'Yogyakarta',
        arrival: 'Bandung'
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Routes', [{
      departure: 'Jakarta',
      arrival: 'Surabaya'
    },{
      departure: 'Jakarta',
      arrival: 'Bandung'
    },{
      departure: 'Jakarta',
      arrival: 'Yogyakarta'
    },{
      departure: 'Surabaya',
      arrival: 'Jakarta'
    },{
      departure: 'Surabaya',
      arrival: 'Bandung'
    },{
      departure: 'Surabaya',
      arrival: 'Yogyakarta'
    },{
      departure: 'Bandung',
      arrival: 'Yogyakarta'
    },{
      departure: 'Bandung',
      arrival: 'Jakarta'
    },{
      departure: 'Bandung',
      arrival: 'Surabaya'
    },{
      departure: 'Yogyakarta',
      arrival: 'Jakarta'
    },{
      departure: 'Yogyakarta',
      arrival: 'Surabaya'
    },{
      departure: 'Yogyakarta',
      arrival: 'Bandung'
    }]);
  }
};
