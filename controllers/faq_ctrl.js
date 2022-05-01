const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const faq = db.faq;
const Op = db.Sequelize.Op;
const Constant = require('../config/constant')
const utility = require('../helpers/utility')

let faqs = {};

faqs.add = async (req, res) => {
    try {
        let { question, answer } = req.body;
        let faqData = {
            question: question,
            answer: answer
        }

        let result = await faq.create(faqData);
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.SLIDE_SAVE_SUCCESS,
            data: result
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


faqs.edit = async (req, res) => {
    try {
        let { answer, id, question } = req.body;

        faq.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            let faqData = {
                answer: answer,
                question: question
            }
            result.update(faqData)
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_SAVE_SUCCESS,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })
    }

}


faqs.delete = async (req, res) => {
    try {

        let { id } = req.body;

        faq.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let faqData = {
                    status: 0

                }
                result.update(faqData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.SLIDE_DELETED_SUCCESS,
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


faqs.getAllFaq = async (req, res) => {
    try {
        let { search } = req.body;
        let condition = {
            status: true
        }
        if (search) {
            condition = {
                [Op.or]: {
                    question: {
                        [Op.like]: `%${search}%`
                    },
                }
            }
        }
        faq.findAll({
            where: condition
        }).then(async (result) => {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_RETRIEVE_SUCCESS,
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

faqs.getAllAprovedfaq = async (req, res) => {
    try {

        faq.findAll({
            where: {
                status: true,
                approved: true
            }
        }).then(async (result) => {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_RETRIEVE_SUCCESS,
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


faqs.AprovedStatus = async (req, res) => {
    try {
        let { id, approved } = req.body;
        faq.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {

            let cmsData = {
                approved: approved
            }
            result.update(cmsData)
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_UPDATE_SUCCESS,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })
    }

}
module.exports = faqs;