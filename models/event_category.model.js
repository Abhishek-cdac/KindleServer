module.exports = (sequelize, Sequelize) => {
  const Event_category = sequelize.define("event_category", {
    name: {
      type: Sequelize.STRING
    },
    name_en: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    description_en: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: true
    }
  },
    {
      timestamps: true
    });

  return Event_category;
};