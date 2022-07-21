module.exports = (sequelize, Sequelize) => {
  const bookByAuthor_tag = sequelize.define(
    "bookByAuthor_tag",
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

  return bookByAuthor_tag;
};
