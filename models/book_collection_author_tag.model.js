module.exports = (sequelize, Sequelize) => {
  const book_collection_author_tag = sequelize.define(
    "book_collection_author_tag",
    {
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return book_collection_author_tag;
};
