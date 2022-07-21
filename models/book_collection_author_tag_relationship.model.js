module.exports = (sequelize, Sequelize) => {
  const book_collection_author_tag_relationship = sequelize.define(
    "book_collection_author_tag_relationship",
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

  return book_collection_author_tag_relationship;
};
