'use strict';

/** @type {import('sequelize-cli').Migration} */

const { user_seeder } = require("../data/data_seeder");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', user_seeder)
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
  }
};
