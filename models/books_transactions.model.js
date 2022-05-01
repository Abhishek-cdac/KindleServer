
module.exports = (sequelize, Sequelize) => {
    const Books_transactions = sequelize.define("books_transactions", {
      from: {
        type: Sequelize.INTEGER(11)
      },
      to: {
        type: Sequelize.INTEGER(11)
      },
      storeId: {
        type: Sequelize.INTEGER(11)
      },
      book_qty: {
        type: Sequelize.INTEGER(11)
      },
      book_details: {
        type: Sequelize.TEXT
      },
      received: {
        type: Sequelize.INTEGER(11),
        allowNull: false, 
        defaultValue: 0 // 0 pending , 1 received, 2 decline
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    }, {
      timestamps: true
    });
  
    return Books_transactions;
  };