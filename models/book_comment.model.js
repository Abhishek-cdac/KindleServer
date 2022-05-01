module.exports = (sequelize, Sequelize) => {
    const book_comment = sequelize.define("book_comment", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.TEXT
      },
      book_id: {
        type: Sequelize.INTEGER(11)
      },
      userId: {
        type: Sequelize.INTEGER(11)
      },
      rating: {
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
  
    return book_comment;
  };