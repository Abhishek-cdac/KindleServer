module.exports = (sequelize, Sequelize) => {
    const blog_comment = sequelize.define("blog_comment", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.TEXT
      },
      comment: {
        type: Sequelize.TEXT
      },
      blog_id: {
        type: Sequelize.INTEGER(11)
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
  
    return blog_comment;
  };