module.exports = (sequelize, Sequelize) => {
  const Blog_category = sequelize.define("blog_category", {
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

  return Blog_category;
};