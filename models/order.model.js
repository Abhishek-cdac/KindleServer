module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
        userId: {
            type: Sequelize.INTEGER(11)
        },
        author: {
            type: Sequelize.INTEGER(11)
        },
        price: {
        type: Sequelize.INTEGER(11)
      },
      quantity:{
        type: Sequelize.INTEGER(11)
      },
      total_price: {
        type: Sequelize.INTEGER(11)
      },
      bookId: {
        type: Sequelize.INTEGER(11)
      },
      storeId: {
        type: Sequelize.TEXT
      },
      shipping: {
        type: Sequelize.TEXT
      },
      deliveryType: {
        type: Sequelize.TEXT
      },
      orderStatus: {
        type: Sequelize.TEXT
      },
      ordernote: {
        type: Sequelize.TEXT
      }
    },
      {
        timestamps: true
      });
  
    return order;
  };