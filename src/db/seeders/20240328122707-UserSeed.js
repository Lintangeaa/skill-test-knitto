'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Admin1',
          password: 'Admin1',
          status: true,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Client1',
          password: 'Client1',
          status: true,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
