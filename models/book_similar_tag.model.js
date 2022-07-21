module.exports = (sequelize, Sequelize) => {
  const book_similar_tag = sequelize.define(
    "book_similar_tag",
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

  return book_similar_tag;
};
