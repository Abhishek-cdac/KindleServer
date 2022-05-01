module.exports = (sequelize, Sequelize) => {
    const cms = sequelize.define("cms", {
        title: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        subtitle: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true
    });

    return cms;
};