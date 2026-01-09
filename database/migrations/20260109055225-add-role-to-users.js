'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.addColumn('Users', 'role', {
  type: Sequelize.STRING,
  defaultValue: 'user'
});
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'role');
  }
};

