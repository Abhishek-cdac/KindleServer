module.exports = (sequelize, Sequelize) => {
  const blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING
    },
    title_en: {
      type: Sequelize.STRING
    },
    category_id: {
      type: Sequelize.INTEGER(11)
    },
    userId: {
      type: Sequelize.INTEGER(11)
    },
    url: {
      type: Sequelize.STRING
    },
    slug:{
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE(6)
    },
    time: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    description_en: {
      type: Sequelize.TEXT
    },
    approved: {
      type: Sequelize.BOOLEAN,
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

  return blog;
};