'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const utility = require('../helpers/utility');
const book_category = db.book_category;
const { Op, sequelize } = require("sequelize");
const { required } = require('joi');
const book = db.books;
const book_tag = db.book_tag;
const book_comment = db.book_comment;
const tag_relationship = db.tag_relationship;
const moment = require('moment');
const user = db.admin;
const { store } = require('../models');
let books = {};

books.addBookCategory = async (req, res) => {
    try {

        let { name, name_en, description, description_en, image } = req.body;
        let cover_img = "";
        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        let result = await book_category.create(blogData);
        if (result) {

            if (image) {
                cover_img = await utility.uploadBase64Image(image)

                let userData = {
                    cover_img: cover_img

                }
                result.update(userData)
            }

            let data = await book_category.findAll({
                where: {
                    status: true
                }
            })

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
                data: data
            })
        } else {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        }
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.editBookCategory = async (req, res) => {
    try {

        let { id, name, name_en, description, description_en } = req.body;

        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        book_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.deleteBookCategory = async (req, res) => {
    try {

        let { id } = req.body;
        book_category.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let blogData = {
                    status: 0

                }
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getAllCategory = async (req, res) => {
    try {

        let data = await book_category.findAll({
            where: {
                status: true
            }
        })
        let massage = (data.length > 0) ? Constant.BOOK_CATEGORY_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getAllTags = async (req, res) => {
    try {

        let data = await book_tag.findAll({})
        let massage = (data.length > 0) ? Constant.BOOK_TAGS_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.add = async (req, res) => {

    try {
        let { name, name_en, category_id, price, description, description_en, publication, author, item_condition, item_condition_en, size, price_type, edition_year, page_count, publush_rights, min_age, max_age, tag, cover_img ,storeId} = req.body;
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
            item_condition: item_condition,
            item_condition_en: item_condition_en, size: size,
            price_type: price_type,
            edition_year: edition_year,
            page_count: page_count,
            publush_rights: publush_rights,
            min_age: min_age,
            slug: slug,
            storeId,storeId,
            max_age: max_age
        }
        book.create(BookData).then(async result => {

            if (tag) {
                let data = await utility.checkTagAndCreate(tag, result.id, book_tag, tag_relationship);
            }

            if (cover_img) {
                cover_img = await utility.uploadBase64Image(cover_img)

                let userData = {
                    cover_img: cover_img

                }
                result.update(userData)
            }

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
                data: result
            })
        }).catch(error => {

            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.edit = async (req, res) => {
    try {

        let { id, name, name_en, category_id, price, description, description_en, publication, author, item_condition, item_condition_en, size, price_type, edition_year, page_count, publush_rights, min_age, max_age, tag, cover_img,storeId} = req.body;
        book.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {

                if (tag) {
                    let data = await utility.checkTagAndCreate(tag, result.id, book_tag, tag_relationship);
                }

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
                    item_condition: item_condition,
                    item_condition_en: item_condition_en, size: size,
                    price_type: price_type,
                    edition_year: edition_year,
                    page_count: page_count,
                    publush_rights: publush_rights,
                    min_age: min_age,
                    slug: slug,
                    storeId,storeId,
                    max_age: max_age
                }

                result.update(BookData)

                if (cover_img) {
                    cover_img = await utility.uploadBase64Image(cover_img)

                    let userData = {
                        cover_img: cover_img

                    }
                    result.update(userData)
                }

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.delete = async (req, res) => {
    try {

        let { id } = req.body;
        book.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let bookData = {
                    status: 0

                }
                result.update(bookData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getBooks = async (req, res) => {
    try {

        let data = await book.findAll({
            where: {
                status: true
            },
            include: [{
                model: book_category
            },
            {
                model: book_comment,
                attributes:['book_id','rating','userId']
            }
         ],
           
        })
        let massage = (data.length > 0) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getBooksByFilter = async (req, res) => {
    try {
        let { max_price, min_price, author, category_id, search, storeId } = req.body;
        let condition = {};
        let models = [{
            model: book_category
        }];
        if (max_price) {
            condition = {
                status: true,
                price: {
                    [Op.and]: {
                        [Op.lte]: max_price,
                        [Op.gte]: min_price,
                    }
                }

            }
        }

        if (search) {
            models.push({
                model: book_tag,
            })

            condition = {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${search}%`
                    },
                    '$book_tags.name$': {
                        [Op.like]: `%${search}%`
                    },
                    '$book_category.name$': {
                        [Op.like]: `%${search}%`
                    },
                }
            }
        }

        if (author) {
            author = author.split(',');
            condition.author = { [Op.in]: author }
        }

        if (category_id) {
            condition.category_id = category_id
        }
	
	if (storeId) {
            condition.storeId = storeId
        }

        let data = await book.findAll({
            where: condition,
            include: models
        });

        let massage = (data.length > 0) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.getBooksByCategory = async (req, res) => {
    try {
        let { name } = req.body;
        let data = await book_category.findOne({
            where: {
                status: true,
                [Op.or]: [
                    {
                        name: name
                    },
                    {
                        name_en: name
                    }
                ]

            },
            include: [{
                model: book,
                where: {
                    status: true
                }
            }]
        })
        let massage = (data) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.getBooksBytag = async (req, res) => {
    try {
        let { slug } = req.body;
        let data = await book_tag.findOne({
            where: {
                name: {
                    [Op.in]: slug
                }
            },
            include: [{
                model: book,
                where: {
                    status: true
                }
            }]
        })
        let massage = (data) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}



books.addBookComment = async (req, res) => {
    try {

        let { name, email, comment, book_id, rating  } = req.body;
        let {userId} = req.user;
        let bookCommentData = {
            name: name,
            email: email,
            comment: comment,
            book_id: book_id,
            userId:userId,
            rating:rating
        }

        let result = await book_comment.create(bookCommentData);
        if (result) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BOOK_COMMENT_SAVE_SUCCESS,
                data: result
            })
        } else {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        }
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getBookBySlug = async (req, res) => {
    try {
        let { slug } = req.body;
        book.findOne({
            where: {
                slug: slug,
                status: true
            },
            include: [{
                model: book_category,
                where: {
                    status: true
                },
                attributes: ["id", "name", "name_en", "description",
                    "description_en"]
            }, {
                model: book_tag,

            },{
                model: store,

            },{
                model: book_comment
            }]
        }).then(async (result) => {

            let massage = (result) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            let data = null;
            if (result) {
                let book_comments = await book_comment.findAll({
                    where: {
                        book_id: result.id
                    }
                });
                data = {
                    result: result,
                    book_comments: book_comments
                }
            }

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getBooksByUserId = async (req, res) => {
    try {
        let { userId } = req.user;
        book.findAll({
            where: {
               [Op.or]: {
                userId: userId,
                author: userId
               }
            },
            include: [{
                model: user
            }]
        }).then(async (result) => {
            let booskdata = [];

            for await (const bookresult of result) {
                let bookresultdata = {};
                await user.findOne({
                    where: {
                        id: bookresult.author
                     }   
                }).then(async (resultdata) =>{
                    bookresultdata = resultdata;
                    
                })
                bookresult.author = bookresultdata;
                booskdata.push(bookresult);
              }
            let massage = (booskdata) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: booskdata
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}
books.getBookByStoreId = async (req, res) => {
    try {
        let { storeId } = req.body;
        book.findAll({
            where: {
                storeId: storeId,
                status: true
            },
            include: [{
                model: book_category,
                where: {
                    status: true
                },
                attributes: ["id", "name", "name_en", "description",
                    "description_en"]
            }, {
                model: book_tag,

            }]
        }).then(async (result) => {

            let massage = (result) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.getLatestBooks = async (req, res) => {
    try {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        book.findAll({
            where: {
                createdAt: {
                 [Op.gte]: date,
                },
                status: true
            }
        }).then(async (result) => {

            let massage = (result) ? Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
           return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.multidelete = async (req, res) => {
    try {

        let { id } = req.body;
        book.findOne({
            where: {
                id:{
                    [Op.or]:id
                },
		status: 1
            }
        }).then(async (result) => {
            if (result) {
                let bookData = {
                    status: 0

                }
                result.update(bookData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}
module.exports = books;
