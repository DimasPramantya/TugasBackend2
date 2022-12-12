'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('paymentDetails',{
        id: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        paymentMethod: {
          type: Sequelize.ENUM('BCA', 'Shopee', 'Dana', 'Gopay'),
          allowNull: false,
        },
        numberBankAcc: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        senderName: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        date: {
          type: Sequelize.DATE(),
          allowNull: false,
        }
      }, {
        timestamps: false,
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('paymentDetails')
  }
};
