const dbConfig = require("../config/db.config");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("./user.model.js")(sequelize, Sequelize);
db.blog = require("./blog.model.js")(sequelize, Sequelize);
db.blog_category = require("./blog_category.model.js")(sequelize, Sequelize);
db.blog_comment = require("./blog.comment.model.js")(sequelize, Sequelize);
db.cms = require("./cms.model.js")(sequelize, Sequelize);
db.faq = require("./faq.model.js")(sequelize, Sequelize);
db.wishlist = require("./wishlist.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.event_category = require("./event_category.model.js")(sequelize, Sequelize);

db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderdetails = require("./orderdetails.model.js")(sequelize, Sequelize);
db.orderproduct = require("./orderproducts.model.js")(sequelize, Sequelize);

db.books = require("./books.model.js")(sequelize, Sequelize);
db.book_category = require("./book_category.model.js")(sequelize, Sequelize);
db.book_tag = require("./book_tag.model.js")(sequelize, Sequelize);
db.tag_relationship = require("./book_tag_relationship.model.js")(
  sequelize,
  Sequelize
);
db.books_transactions = require("./books_transactions.model.js")(
  sequelize,
  Sequelize
);
db.store = require("./store.model.js")(sequelize, Sequelize);
db.book_comment = require("./book_comment.model.js")(sequelize, Sequelize);
db.bookByAuthor_tag = require("./bookByAuthor_tag.model")(sequelize, Sequelize);
db.bookByAuthor_tag_relationship =
  require("./bookByAuthor_tag_relationship.model")(sequelize, Sequelize);
db.book_parter_tag = require("./book_parter_tag.model")(sequelize, Sequelize);
db.book_parter_tag_relatioship = require("./book_parter_tag_relatioship.model")(
  sequelize,
  Sequelize
);
db.book_partnerLink_tag = require("./book_partnerLink_tag.model")(
  sequelize,
  Sequelize
);
db.book_partnerLink_tag_relationship =
  require("./book_partnerLink_tag_relationship.model")(sequelize, Sequelize);

db.book_similar_tag = require("./book_similar_tag.model")(sequelize, Sequelize);
db.book_similar_tag_relationship =
  require("./book_similar_tag_relationship.model")(sequelize, Sequelize);
db.enquiry_form = require("./enquiry_form.model.js")(sequelize, Sequelize);
db.book_collection_author_tag = require("./book_collection_author_tag.model")(
  sequelize,
  Sequelize
);
db.book_collection_author_tag_relationship =
  require("./book_collection_author_tag_relationship.model")(
    sequelize,
    Sequelize
  );
db.book_size_tag = require("./book_size_tag.model")(sequelize, Sequelize);
db.book_size_tag_relationship = require("./book_size_tag_relationship.model")(
  sequelize,
  Sequelize
);
db.books.hasMany(db.book_comment, {
  foreignKey: "book_id",
});
db.book_comment.belongsTo(db.books, {
  foreignKey: "book_id",
});

db.order.hasMany(db.orderdetails, {
  foreignKey: "orderId",
});

db.orderdetails.belongsTo(db.order, {
  foreignKey: "orderId",
});

db.store.hasMany(db.order, {
  foreignKey: "storeId",
});

db.order.belongsTo(db.store, {
  foreignKey: "storeId",
});

db.store.hasMany(db.books, {
  foreignKey: "storeId",
});

db.books.belongsTo(db.store, {
  foreignKey: "storeId",
});

db.book_category.hasMany(db.books, {
  foreignKey: "category_id",
});

db.books.belongsTo(db.book_category, {
  foreignKey: "category_id",
});

db.books.belongsToMany(db.book_tag, {
  through: "book_tag_relationships",
  foreignKey: "bookId",
});

db.book_tag.belongsToMany(db.books, {
  through: "book_tag_relationships",
  foreignKey: "tagId",
});

db.admin.hasMany(db.books, {
  foreignKey: "userId",
});

db.books.belongsTo(db.admin, {
  foreignKey: "userId",
});

db.admin.hasMany(db.blog);
db.blog.belongsTo(db.admin);

db.admin.hasMany(db.event);
db.event.belongsTo(db.admin);

db.event_category.hasMany(db.event, {
  foreignKey: "category_id",
});
db.event.belongsTo(db.event_category, {
  foreignKey: "category_id",
});

db.blog_category.hasMany(db.blog, {
  foreignKey: "category_id",
});
db.blog.belongsTo(db.blog_category, {
  foreignKey: "category_id",
});

db.blog.hasMany(db.blog_comment, {
  foreignKey: "blog_id",
});
db.blog_comment.belongsTo(db.blog, {
  foreignKey: "blog_id",
});

db.books.belongsToMany(db.bookByAuthor_tag, {
  through: "bookByAuthor_tag_relationship",
  foreignKey: "bookId",
});

db.bookByAuthor_tag.belongsToMany(db.books, {
  through: "bookByAuthor_tag_relationship",
  foreignKey: "tagId",
});

db.books.belongsToMany(db.book_parter_tag, {
  through: "book_parter_tag_relatioship",
  foreignKey: "bookId",
});

db.book_parter_tag.belongsToMany(db.books, {
  through: "book_parter_tag_relatioship",
  foreignKey: "tagId",
});

db.books.belongsToMany(db.book_partnerLink_tag, {
  through: "book_partnerLink_tag_relationship",
  foreignKey: "bookId",
});

db.book_partnerLink_tag.belongsToMany(db.books, {
  through: "book_partnerLink_tag_relationship",
  foreignKey: "tagId",
});

db.books.belongsToMany(db.book_similar_tag, {
  through: "book_similar_tag_relationship",
  foreignKey: "bookId",
});

db.book_similar_tag.belongsToMany(db.books, {
  through: "book_similar_tag_relationship",
  foreignKey: "tagId",
});

db.books.belongsToMany(db.book_collection_author_tag, {
  through: "book_collection_author_tag_relationship",
  foreignKey: "bookId",
});

db.book_collection_author_tag.belongsToMany(db.books, {
  through: "book_collection_author_tag_relationship",
  foreignKey: "tagId",
});
db.books.belongsToMany(db.book_size_tag, {
  through: "book_size_tag_relationship",
  foreignKey: "bookId",
});

db.book_size_tag.belongsToMany(db.books, {
  through: "book_size_tag_relationship",
  foreignKey: "tagId",
});
db.books.hasMany(db.orderproduct, {
  foreignKey: "productId",
});

db.orderproduct.belongsTo(db.books, {
  foreignKey: "productId",
});
module.exports = db;
