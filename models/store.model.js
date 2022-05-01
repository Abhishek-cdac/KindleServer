module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      timing: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER(11)
      },
      description: {
        type: Sequelize.TEXT
      },
      description_en: {
        type: Sequelize.TEXT
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    }, {
      timestamps: true
    });
  
    return Store;
  };