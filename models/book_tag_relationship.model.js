module.exports = (sequelize, Sequelize) => {
  const Book_tag_relationship = sequelize.define("book_tag_relationship", {
    bookId: {
      type: Sequelize.INTEGER(11)
    },
    tagId: {
      type: Sequelize.INTEGER(11)
    }
  }, {
    timestamps: true
  });

  return Book_tag_relationship;
};