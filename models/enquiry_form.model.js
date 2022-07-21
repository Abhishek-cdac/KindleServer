module.exports = (sequelize, Sequelize) => {
  const enquiry_form = sequelize.define(
    "enquiry_form",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      role: {
        type: Sequelize.INTEGER(11),
        defaultValue: false, // 1 for superadmin , 2 for admin, 3 for consignee , 4 for auther , 5 for client (customer)
      },
      phone: {
        type: Sequelize.BIGINT(11),
      },
      subject: {
        type: Sequelize.TEXT,
      },
      message: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return enquiry_form;
};
