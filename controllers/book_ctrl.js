"use strict";
var jwt = require("jsonwebtoken");
const config = require("../config");
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const book_category = db.book_category;
const { Op, sequelize } = require("sequelize");
const { required } = require("joi");
const book = db.books;
const book_tag = db.book_tag;
const book_comment = db.book_comment;
const tag_relationship = db.tag_relationship;
const bookByAuthor_tag = db.bookByAuthor_tag;
const bookByAuthor_tag_relationship = db.bookByAuthor_tag_relationship;
const book_parter_tag = db.book_parter_tag;
const book_parter_tag_relatioship = db.book_parter_tag_relatioship;
const book_partnerLink_tag = db.book_partnerLink_tag;
const book_partnerLink_tag_relationship = db.book_partnerLink_tag_relationship;
const book_similar_tag = db.book_similar_tag;
const book_similar_tag_relationship = db.book_similar_tag_relationship;
const book_collection_author_tag = db.book_collection_author_tag;
const book_collection_author_tag_relationship =
  db.book_collection_author_tag_relationship;
const book_size_tag = db.book_size_tag;
const book_size_tag_relationship = db.book_size_tag_relationship;
const moment = require("moment");
const user = db.admin;
const { store } = require("../models");
let books = {};

books.addBookCategory = async (req, res) => {
  try {
    let { name, name_en, description, description_en, image } = req.body;
    let cover_img = "";
    let blogData = {
      name: name,
      name_en: name_en,
      description: description,
      description_en: description_en,
    };

    let result = await book_category.create(blogData);
    if (result) {
      if (image) {
        cover_img = await utility.uploadBase64Image(image);

        let userData = {
          cover_img: cover_img,
        };
        result.update(userData);
      }

      let data = await book_category.findAll({
        where: {
          status: true,
        },
      });

      return res.json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
        data: data,
      });
    } else {
      return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: result,
      });
    }
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.editBookCategory = async (req, res) => {
  try {
    let { id, name, name_en, description, description_en } = req.body;

    let blogData = {
      name: name,
      name_en: name_en,
      description: description,
      description_en: description_en,
    };

    book_category
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          result.update(blogData);

          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
            data: result,
          });
        } else {
          return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.deleteBookCategory = async (req, res) => {
  try {
    let { id } = req.body;
    book_category
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let blogData = {
            status: 0,
          };
          result.update(blogData);

          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getAllCategory = async (req, res) => {
  try {
    let data = await book_category.findAll({
      where: {
        status: true,
      },
    });
    let massage =
      data.length > 0
        ? Constant.BOOK_CATEGORY_RETRIEVE_SUCCESS
        : Constant.NO_DATA_FOUND;
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getAllTags = async (req, res) => {
  try {
    let data = await book_tag.findAll({});
    let massage =
      data.length > 0
        ? Constant.BOOK_TAGS_RETRIEVE_SUCCESS
        : Constant.NO_DATA_FOUND;
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.add = async (req, res) => {
  try {
    let {
      name,
      name_en,
      category_id,
      price,
      description,
      description_en,
      publication,
      author,
      item_condition,
      item_condition_en,
      size,
      price_type,
      edition_year,
      page_count,
      publush_rights,
      min_age,
      max_age,
      tag,
      bookByAuthor,
      partnar,
      partnarLink,
      similar,
      collection_author,
      synopsis,
      isbn,
      pre_sale,
      pre_sale_date,
      cover_img,
      storeId,
      approved
    } = req.body;
    let { userId } = req.user;
    let slug = await utility.generateSlug(name, book);

    let BookData = {
      name: name,
      name_en: name_en,
      category_id: category_id,
      price: price,
      userId: userId,
      description: description,
      description_en: description_en,
      publication: publication,
      author: author,
      synopsis: synopsis,
      ISBN: isbn,
      item_condition: item_condition,
      item_condition_en: item_condition_en,
      price_type: price_type,
      edition_year: edition_year,
      page_count: page_count,
      publush_rights: publush_rights,
      min_age: min_age,
      slug: slug,
      storeId,
      storeId,
      max_age: max_age,
      pre_sale: pre_sale,
      pre_sale_date: pre_sale_date,
      approved: approved
    };
    book
      .create(BookData)
      .then(async (result) => {
        if (tag) {
          let data = await utility.checkTagAndCreate(
            tag,
            result.id,
            book_tag,
            tag_relationship
          );
        }
        if (bookByAuthor) {
          let data = await utility.checkTagAndCreate(
            bookByAuthor,
            result.id,
            bookByAuthor_tag,
            bookByAuthor_tag_relationship
          );
        }
        if (partnar) {
          let data = await utility.checkTagAndCreate(
            partnar,
            result.id,
            book_parter_tag,
            book_parter_tag_relatioship
          );
        }

        if (partnarLink) {
          let data = await utility.checkTagAndCreate(
            partnarLink,
            result.id,
            book_partnerLink_tag,
            book_partnerLink_tag_relationship
          );
        }

        if (similar) {
          let data = await utility.checkTagAndCreate(
            similar,
            result.id,
            book_similar_tag,
            book_similar_tag_relationship
          );
        }
        if (collection_author) {
          let data = await utility.checkTagAndCreate(
            collection_author,
            result.id,
            book_collection_author_tag,
            book_collection_author_tag_relationship
          );
        }
	 if (size) {
          let data = await utility.checkTagAndCreate(
            size,
            result.id,
            book_size_tag,
            book_size_tag_relationship
          );
        }
        if (cover_img) {
          cover_img = await utility.uploadBase64Image(cover_img);

          let userData = {
            cover_img: cover_img,
          };
          result.update(userData);
        }

        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
          data: result,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: result,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
books.edit = async (req, res) => {
  try {
    let {
      id,
      name,
      name_en,
      category_id,
      price,
      description,
      description_en,
      publication,
      author,
      item_condition,
      item_condition_en,
      size,
      price_type,
      edition_year,
      page_count,
      publush_rights,
      min_age,
      max_age,
      tag,
      bookByAuthor,
      partnar,
      partnarLink,
      pre_sale,
      pre_sale_date,
      collection_author,
      similar,
      cover_img,
      storeId,
      synopsis,
      isbn,
    } = req.body;
    let { userId } = req.body;
    let Data = {
      name: name,
      userId: userId,	
      name_en: name_en,
      price_type: price_type,
      edition_year: edition_year,
      page_count: page_count,
      publush_rights: publush_rights,
      min_age: min_age,
      max_age: max_age,
      storeId,
      category_id: category_id,
      price: price,
      description: description,
      description_en: description_en,
      publication: publication,
      author: author,
      item_condition: item_condition,
      item_condition_en: item_condition_en,
      synopsis: synopsis,
      ISBN: isbn,
      pre_sale: pre_sale,
      pre_sale_date: pre_sale_date,
    };
    book
      .findOne({
        where: {
          id: id,
          status: true,
        },
      })
      .then(async (result) => {
        if (result) {
          if (tag) {
            let data = await utility.checkTagAndCreate(
              tag,
              result.id,
              book_tag,
              tag_relationship
            );
          }
          if (bookByAuthor) {
            let data = await utility.checkTagAndCreate(
              bookByAuthor,
              result.id,
              bookByAuthor_tag,
              bookByAuthor_tag_relationship
            );
          }
          if (partnar) {
            let data = await utility.checkTagAndCreate(
              partnar,
              result.id,
              book_parter_tag,
              book_parter_tag_relatioship
            );
          }

          if (partnarLink) {
            let data = await utility.checkTagAndCreate(
              partnarLink,
              result.id,
              book_partnerLink_tag,
              book_partnerLink_tag_relationship
            );
          }

          if (similar) {
            let data = await utility.checkTagAndCreate(
              similar,
              result.id,
              book_similar_tag,
              book_similar_tag_relationship
            );
          }
          if (collection_author) {
            let data = await utility.checkTagAndCreate(
              collection_author,
              result.id,
              book_collection_author_tag,
              book_collection_author_tag_relationship
            );
          }
	  if (size) {
          let data = await utility.checkTagAndCreate(
            size,
            result.id,
            book_size_tag,
            book_size_tag_relationship
            );
          }
          result.update(Data);
          if (cover_img) {
            cover_img = await utility.uploadBase64Image(cover_img);

            let userData = {
              cover_img: cover_img,
            };
            result.update(userData);
          }

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_RETRIEVE_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
books.delete = async (req, res) => {
  try {
    let { id } = req.body;
    book
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let bookData = {
            status: 0,
          };
          result.update(bookData);

          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getBooks = async (req, res) => {
  try {
    let data = await book.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: book_category,
        },
        {
          model: book_comment,
          attributes: ["book_id", "rating", "userId"],
        },
        {
          model: book_tag,
        },
        {
          model: book_parter_tag,
        },
        {
          model: bookByAuthor_tag,
        },
        {
          model: book_collection_author_tag,
        },
        {
          model: book_partnerLink_tag,
        },
        {
          model: book_similar_tag,
        },
        {
          model: book_size_tag,
        },
        {
          model: user,
        },
      ],
    });
    let massage =
      data.length > 0 ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND;
      let booskdata = [];

    for await (const bookresult of data) {
      let bookresultdata = {};
      await user
        .findOne({
          where: {
            id: bookresult.author,
          },
        })
        .then(async (resultdata) => {
          bookresultdata = resultdata;
        });
      bookresult.author = bookresultdata;
      booskdata.push(bookresult);
    }
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: booskdata,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
books.getBooksByFilter = async (req, res) => {
  try {
    let { max_price, min_price, author, category_id, search, storeId } =
      req.body;
    let condition = {
      status: true,
      // approved: true,
    };
    let models = [
      {
        model: book_category,
      },
      {
        model: bookByAuthor_tag,
      },
      {
        model: book_collection_author_tag,
      },
      {
        model: book_parter_tag,
      },
      {
        model: book_partnerLink_tag,
      },
      {
        model: book_similar_tag,
      },
      {
        model: book_size_tag,
      },
      {
        model: book_tag,
      },
      {
        model: user,
      },
    ];
    if (max_price) {
      condition = {
        status: true,
        //approved: true,
        price: {
          [Op.and]: {
            [Op.lte]: max_price,
            [Op.gte]: min_price,
          },
        },
      };
    }

    if (search) {
      models.push({
        model: book_tag,
      });

      condition = {
        [Op.or]: {
          "$book_tags.name$": {
            [Op.like]: `%${search}%`,
          },
        },
      };
    }

    if (author) {
      author = author.split(",");
      condition.author = { [Op.in]: author };
    }

    if (category_id) {
      condition.category_id = category_id;
    }

    if (storeId) {
      condition.storeId = storeId;
    }

    let data = await book.findAll({
      where: condition,
      include: models,
    });

    let massage =
      data.length > 0 ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND;
    let booskdata = [];

    for await (const bookresult of data) {
      let bookresultdata = {};
      await user
        .findOne({
          where: {
            id: bookresult.author,
          },
        })
        .then(async (resultdata) => {
          bookresultdata = resultdata;
        });
      bookresult.author = bookresultdata;
      booskdata.push(bookresult);
    }
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: booskdata,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};books.getBooksByCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let data = await book_category.findOne({
      where: {
        status: true,
        [Op.or]: [
          {
            name: name,
          },
          {
            name_en: name,
          },
        ],
      },
      include: [
        {
          model: book,
          where: {
            status: true,
          },
        },
      ],
    });
    let massage = data
      ? Constant.BOOK_RETRIEVE_SUCCESS
      : Constant.NO_DATA_FOUND;
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getBooksBytag = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await book_tag.findOne({
      where: {
        name: {
          [Op.in]: slug,
        },
      },
      include: [
        {
          model: book,
          where: {
            status: true,
          },
        },
      ],
    });
    let massage = data
      ? Constant.BOOK_RETRIEVE_SUCCESS
      : Constant.NO_DATA_FOUND;
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.addBookComment = async (req, res) => {
  try {
    let { name, email, comment, book_id, rating } = req.body;
    let { userId } = req.user;
    let bookCommentData = {
      name: name,
      email: email,
      comment: comment,
      book_id: book_id,
      userId: userId,
      rating: rating,
    };

    let result = await book_comment.create(bookCommentData);
    if (result) {
      return res.json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.BOOK_COMMENT_SAVE_SUCCESS,
        data: result,
      });
    } else {
      return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: result,
      });
    }
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getBookBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    book
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: book_category,
            where: {
              status: true,
            },
            attributes: [
              "id",
              "name",
              "name_en",
              "description",
              "description_en",
            ],
          },
          {
            model: book_tag,
          },
          {
            model: store,
          },
          {
            model: book_comment,
          },
          {
            model: bookByAuthor_tag,
          },
          {
            model: book_parter_tag,
          },
          {
            model: book_similar_tag,
          },
          {
            model: book_partnerLink_tag,
          },
          {
            model: book_collection_author_tag,
          },
	  {
            model: book_size_tag,
          },
        ],
      })
      .then(async (result) => {
        let massage = result
          ? Constant.BOOK_RETRIEVE_SUCCESS
          : Constant.NO_DATA_FOUND;
        let data = null;
        if (result) {
          let book_comments = await book_comment.findAll({
            where: {
              book_id: result.id,
            },
          });
          data = {
            result: result,
            book_comments: book_comments,
          };
        }

        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: data,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
books.getBooksByUserId = async (req, res) => {
  try {
    let { userId } = req.body;
    book
      .findAll({
        where: {
          status: true,
          [Op.or]: {
            userId: userId,
            author: userId,
          },
        },
        include: [
          {
            model: book_category,
          },
          {
            model: bookByAuthor_tag,
          },
          {
            model: book_tag,
          },
          {
            model: book_parter_tag,
          },
          {
            model: book_partnerLink_tag,
          },
          {
            model: book_similar_tag,
          },
          {
            model: book_collection_author_tag,
          },
	  {
            model: book_size_tag,
          },
          {
            model: user,
          },
        ],
      })
      .then(async (result) => {
        let booskdata = [];

        for await (const bookresult of result) {
          let bookresultdata = {};
          await user
            .findOne({
              where: {
                id: bookresult.author,
              },
            })
            .then(async (resultdata) => {
              bookresultdata = resultdata;
            });
          bookresult.author = bookresultdata;
          booskdata.push(bookresult);
        }
        let massage = booskdata
          ? Constant.BOOK_RETRIEVE_SUCCESS
          : Constant.NO_DATA_FOUND;

        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: booskdata,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
books.getBookByStoreId = async (req, res) => {
  try {
    let { storeId } = req.body;
    book
      .findAll({
        where: {
          storeId: storeId,
          status: true,
        },
        include: [
          {
            model: book_category,
            where: {
              status: true,
            },
            attributes: [
              "id",
              "name",
              "name_en",
              "description",
              "description_en",
            ],
          },
          {
            model: book_tag,
          },
        ],
      })
      .then(async (result) => {
        let massage = result
          ? Constant.BOOK_RETRIEVE_SUCCESS
          : Constant.NO_DATA_FOUND;
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: result,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.getLatestBooks = async (req, res) => {
  try {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    book
      .findAll({
        where: {
          createdAt: {
            [Op.gte]: date,
          },
          status: true,
        },
      })
      .then(async (result) => {
        let massage = result
          ? Constant.BOOK_RETRIEVE_SUCCESS
          : Constant.NO_DATA_FOUND;
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: result,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.multidelete = async (req, res) => {
  try {
    let { id } = req.body;
    book
      .findOne({
        where: {
          id: {
            [Op.or]: id,
          },
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let bookData = {
            status: 0,
          };
          result.update(bookData);

          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

books.approvedBooks = async (req, res) => {
  try {
    let { bookId, approved } = req.body;
    book
      .findOne({
        where: {
          id: bookId,
        },
      })
      .then((result) => {
        if (result) {
          let Data = {
            approved: approved,
          };
          result.update(Data);

          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
            data: result,
          });
        } else {
          return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
            data: null,
          });
        }
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null,
    });
  }
};

books.getAllApprovedBooks = async (req, res) => {
  try {
    let data = await book.findAll({
      where: {
        status: true,
        approved: true,
      },
      include: [
        {
          model: book_category,
        },
        {
          model: book_comment,
          attributes: ["book_id", "rating", "userId"],
        },
        {
          model: book_tag,
        },
        {
          model: book_parter_tag,
        },
        {
          model: bookByAuthor_tag,
        },
        {
          model: book_collection_author_tag,
        },
        {
          model: book_partnerLink_tag,
        },
        {
          model: book_similar_tag,
        },
        {
          model: book_size_tag,
        },
        {
          model: user,
        },
      ],
    });
    let massage =
      data.length > 0 ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND;
let booskdata = [];

    for await (const bookresult of data) {
      let bookresultdata = {};
      await user
        .findOne({
          where: {
            id: bookresult.author,
          },
        })
        .then(async (resultdata) => {
          bookresultdata = resultdata;
        });
      bookresult.author = bookresultdata;
      booskdata.push(bookresult);
    }
    return res.json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: booskdata,
    });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
module.exports = books;
