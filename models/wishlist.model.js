module.exports = (sequelize, Sequelize) => {
    const wishlist = sequelize.define("wishlist", {
        book_id: {
            type: Sequelize.INTEGER(11)
        },
        book_name: {
            type: Sequelize.STRING
        },
        book_slug: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER(11)
        },
        image_url: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true
    });

    return wishlist;
};