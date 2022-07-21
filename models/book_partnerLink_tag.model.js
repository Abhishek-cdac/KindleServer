module.exports = (sequelize, Sequelize) => {
  const book_partnerLink_tag = sequelize.define(
    "book_partnerLink_tag",
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

  return book_partnerLink_tag;
};
