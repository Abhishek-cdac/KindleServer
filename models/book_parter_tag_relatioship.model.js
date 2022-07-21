module.exports = (sequelize, Sequelize) => {
  const book_parter_tag_relatioship = sequelize.define(
    "book_parter_tag_relatioship",
    {
      bookId: {
        type: Sequelize.INTEGER(11),
      },
      tagId: {
        type: Sequelize.INTEGER(11),
      },
    },
    {
      timestamps: true,
    }
  );

  return book_parter_tag_relatioship;
};
