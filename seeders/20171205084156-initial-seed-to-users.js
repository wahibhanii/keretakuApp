'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Users', [
      {
        email     : "susi.susanti@gmail.com",
        password  : "susisusanti",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "admin@admin.com",
        password  : "admin",
        role      : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "andi.rohmadi@gmail.com",
        password  : "andirohmadi",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "alam.semesta@alam.com",
        password  : "alamsemesta",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "hidayat@gmail.com",
        password  : "hidayat",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "armin@gmail.com",
        password  : "armin",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "wiwiek@gmail.com",
        password  : "wiwiek",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "lebron.james@gmail.com",
        password  : "lebronjames",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "ermy.kulit@gmail.com",
        password  : "ermykulit",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email     : "suharti@ayamsuharti.com",
        password  : "suharti",
        role      : "user",
        createdAt : new Date(),
        updatedAt : new Date()
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
