'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Trains', [{
        trainName: 'Argo Parahyangan'
      }, {
        trainName: 'Argo Dwipangga'
      }, {
        trainName: 'Taksaka'
      }, {
        trainName: 'Bima'
      }, {
        trainName: 'Gajayana'
      }, {
        trainName: 'Argo Lawu'
      }, {
        trainName: 'Purwojaya'
      }, {
        trainName: 'Bangunkarta'
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trains', [{
      trainName: 'Argo Parahyangan'
    }, {
      trainName: 'Argo Dwipangga'
    }, {
      trainName: 'Taksaka'
    }, {
      trainName: 'Bima'
    }, {
      trainName: 'Gajayana'
    }, {
      trainName: 'Argo Lawu'
    }, {
      trainName: 'Purwojaya'
    }, {
      trainName: 'Bangunkarta'
    }]);
  }
};
