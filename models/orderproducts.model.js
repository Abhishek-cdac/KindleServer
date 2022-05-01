module.exports = (sequelize, Sequelize) => {
    const orderproduct = sequelize.define("orderproduct", {
        orderId: {
            type: Sequelize.INTEGER(11)
        },
        productId: {
        type: Sequelize.INTEGER(11)
      },
      price: {
        type: Sequelize.INTEGER(11)
      },
      totalPrice:{
        type: Sequelize.INTEGER(11)
      },
      quantity: {
        type: Sequelize.INTEGER(11)
      },
      storeId: {
        type: Sequelize.INTEGER(11)
      }
    },
      {
        timestamps: true
      });
  
    return orderproduct;
  };