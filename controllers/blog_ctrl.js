'use strict'
const utility = require('../helpers/utility');
const db = require("../models");
const Constant = require('../config/constant');
const blog = db.blog;
const blog_category = db.blog_category;
const blog_comment = db.blog_comment;
const { Op, sequelize } = require("sequelize");
let blogs = {};


blogs.add = async (req, res) => {
    try {

        let { title, title_en, category_id, url, date, time, description, description_en, image } = req.body;
        let { userId } = req.user;
        let fileName = '';
        let slug = await utility.generateSlug(title, blog);
        let blogData = {
            title: title,
            title_en: title_en,
            category_id: category_id,
            userId: userId,
            slug: slug,
            url: url,
            date: date,
            time: time,
            image: fileName,
            description: description,
            description_en: description_en
        }

        let result = await blog.create(blogData);
        if (result) {

            if (image) {
                fileName = await utility.uploadBase64Image(image)

                let userData = {
                    image: fileName

                }
                result.update(userData)
            }
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BLOG_SAVE_SUCCESS,
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


blogs.edit = async (req, res) => {
    try {

        let { id, title, title_en, category_id, url, date, time, description, description_en } = req.body;
        let { userId } = req.user;
        let blogData = {
            title: title,
            title_en: title_en,
            category_id: category_id,
            userId: userId,
            url: url,
            date: date,
            time: time,
            description: description,
            description_en: description_en
        }

        if (req.files) {
            blogData.image = await utility.fileupload(req.files)
        }


        blog.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(blogData)
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BLOG_UPDATED_SUCCESS,
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


blogs.delete = async (req, res) => {
    try {

        let { id } = req.body;

        blog.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let blogData = {
                    status: 0

                }
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BLOG_DELETED_SUCCESS,
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


blogs.addBlogCategory = async (req, res) => {
    try {

        let { name, name_en, description, description_en } = req.body;

        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        let result = await blog_category.create(blogData);
        if (result) {
            let data = await blog_category.findAll({
                where: {
                    status: true
                }
            })

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BLOG_CATEGORY_SAVE_SUCCESS,
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


blogs.editBlogCategory = async (req, res) => {
    try {

        let { id, name, name_en, description, description_en } = req.body;

        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        blog_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BLOG_CATEGORY_UPDATED_SUCCESS,
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


blogs.deleteBlogCategory = async (req, res) => {
    try {

        let { id } = req.body;
        blog_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let blogData = {
                    status: 0

                }
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BLOG_CATEGORY_DELETED_SUCCESS,
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

blogs.getAllBlogs = async (req, res) => {
    try {
        let { search } = req.body;
        let condition = {
            status: true
        }
        if (search) {
            condition = {
                [Op.or]: {
                    title: {
                        [Op.like]: `%${search}%`
                    },
                    url: {
                        [Op.like]: `%${search}%`
                    },
                    description: {
                        [Op.like]: `%${search}%`
                    },
                    '$blog_category.name$': {
                        [Op.like]: `%${search}%`
                    }
                }
            }
        }
        blog.findAll({
            where: condition,
            include: [{
                model: blog_category,
                attributes: ["id", "name", "name_en", "description",
                    "description_en"],
                where: {
                    status: true
                }
            }]
        }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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


blogs.getBlogsByUser = async (req, res) => {
    try {
        let { userId } = req.user;
        blog.findAll({
            where: {
                userId: userId,
                status: true
            },
            include: [{
                model: blog_category,
                attributes: ["id", "name", "name_en", "description",
                    "description_en"],
                where: {
                    status: true
                }
            }]
        }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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


blogs.getAllBlogsByMonth = async (req, res) => {
    try {
        blog.findAll().then(result => {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BLOG_RETRIEVE_SUCCESS,
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

blogs.getBlogBySlug = async (req, res) => {
    try {
        let { slug } = req.body;
        blog.findOne({
            where: {
                slug: slug,
                status: true
            },
            include: [{
                model: blog_category,
                where: {
                    status: true
                },
                attributes: ["id", "name", "name_en", "description",
                    "description_en"]
            }, {
                model: blog_comment,
                attributes: ["name", "email", "website",
                    "comment"]
            }]
        }).then(result => {

            let massage = (result) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

blogs.getBlogsByCategoryname = async (req, res) => {
    try {
        let { name } = req.body;
        blog_category.findAll({
            where: {
                [Op.or]: [
                    {
                        name: name
                    },
                    {
                        name_en: name
                    }
                ],
                status: true
            },
            include: [blog]

        }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

blogs.getBlogsByCategoryId = async (req, res) => {
    try {
        let { id } = req.body;
        blog_category.findAll({
            where: {
                id: id,
                status: true
            },
            include: [{
                model: blog,
                where: {
                    status: true
                }
            }]

        }).then(result => {
            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND

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

blogs.getAllBlogsCategory = async (req, res) => {
    try {
        blog_category.findAll({
            where: {
                status: true
            }
        }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

blogs.addBlogComment = async (req, res) => {
    try {

        let { name, email, website, comment, blog_id } = req.body;
        let blogCommentData = {
            name: name,
            email: email,
            website: website,
            comment: comment,
            blog_id: blog_id
        }

        let result = await blog_comment.create(blogCommentData);
        if (result) {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BLOG_COMMENT_SAVE_SUCCESS,
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

blogs.multidelete = async (req, res) => {
    try {

        let { id } = req.body;

        blog.findOne({
            where: {
                id:{
                    [Op.or]:id
                }            }
        }).then(async (result) => {
            if (result) {
                let blogData = {
                    status: 0

                }
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BLOG_DELETED_SUCCESS,
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

module.exports = blogs;