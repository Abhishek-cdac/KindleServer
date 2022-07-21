module.exports = (sequelize, Sequelize) => {
  const book_size_tag = sequelize.define(
    "book_size_tag",
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

  return book_size_tag;
};
