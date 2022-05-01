module.exports = (sequelize, Sequelize) => {
    const orderdetails = sequelize.define("orderdetails", {
        orderId: {
            type: Sequelize.INTEGER(11)
        },
        billing_firstname: {
        type: Sequelize.TEXT
      },
      billing_email: {
        type: Sequelize.TEXT
      },
      billing_lastname: {
        type: Sequelize.TEXT
      },
      billing_companyName: {
        type: Sequelize.TEXT
      },
      billing_country: {
        type: Sequelize.TEXT
      },
      billing_address: {
        type: Sequelize.TEXT
      },
      billing_address_optional: {
        type: Sequelize.TEXT
      },
      billing_location: {
        type: Sequelize.TEXT
      },
      billing_Province: {
        type: Sequelize.TEXT
      },
      billing_phone: {
        type: Sequelize.TEXT
      },
      shipping_firstname: {
        type: Sequelize.TEXT
      },
      shipping_lastname: {
        type: Sequelize.TEXT
      },
      shipping_companyName: {
        type: Sequelize.TEXT
      },
      shipping_country: {
        type: Sequelize.TEXT
      },
      shipping_address: {
        type: Sequelize.TEXT
      },
      shipping_email: {
        type: Sequelize.TEXT
      },
      shipping_address_optional: {
        type: Sequelize.TEXT
      },
      shipping_location: {
        type: Sequelize.TEXT
      },
      shipping_Province: {
        type: Sequelize.TEXT
      },
      shipping_phone: {
        type: Sequelize.TEXT
      }
    },
      {
        timestamps: true
      });
  
    return orderdetails;
  };