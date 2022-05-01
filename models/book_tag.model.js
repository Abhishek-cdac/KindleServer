module.exports = (sequelize, Sequelize) => {
    const Book_tag = sequelize.define("book_tag", {
        name: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true
    });

    return Book_tag;
};