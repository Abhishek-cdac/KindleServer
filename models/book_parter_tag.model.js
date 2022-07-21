module.exports = (sequelize, Sequelize) => {
  const book_parter_tag = sequelize.define(
    "book_parter_tag",
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

  return book_parter_tag;
};
