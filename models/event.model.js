module.exports = (sequelize, Sequelize) => {
  const event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING
    },
    name_en: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER(11)
    },
    date: {
      type: Sequelize.DATE(6)
    },
    time: {
      type: Sequelize.STRING
    },
    category_id: {
      type: Sequelize.INTEGER(11)
    },
    image: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },    
    description: {
      type: Sequelize.TEXT
    },
    description_en: {
      type: Sequelize.TEXT
    },
    address: {
      type: Sequelize.TEXT
    },
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  return event;
};