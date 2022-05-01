module.exports = (sequelize, Sequelize) => {
    const books = sequelize.define("books", {
        name: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER(11)
        },
        userId: {
            type: Sequelize.INTEGER(11)
        },
        storeId: {
            type: Sequelize.INTEGER(11) 
        },
        price: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        description_en: {
            type: Sequelize.TEXT
        },
        publication: {
            type: Sequelize.TEXT
        },
        author: {
            type: Sequelize.INTEGER(11)
        },
        item_condition: {
            type: Sequelize.TEXT
        },
        item_condition_en: {
            type: Sequelize.TEXT
        },
        size: {
            type: Sequelize.TEXT
        },
        cover_img: {
            type: Sequelize.TEXT
        },
        price_type: {
            type: Sequelize.STRING
        },
        edition_year: {
            type: Sequelize.STRING
        },
        page_count: {
            type: Sequelize.INTEGER(11)
        },
        publush_rights: {
            type: Sequelize.STRING
        },
        min_age: {
            type: Sequelize.INTEGER(11)
        },
        max_age: {
            type: Sequelize.INTEGER(11)
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true
    });

    return books;
};