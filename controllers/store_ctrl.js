'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const user = db.admin;
const store = db.store;
const books_transactions = db.books_transactions;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const utility = require('../helpers/utility')
const validation = require('../helpers/validation')
const Constant = require('../config/constant')
const mailer = require('../lib/mailer')
let stores = {};


stores.addStore = async function (req, res) {

    try {

        let userData = await validation.store(req.body)
        if (userData.message) {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.INVAILID_DATA,
                data: userData.message
            })
        } else {
            let result = await store.create(userData);
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.STORE_SAVE_SUCCESS,
                data: result
            })
        }


    }
    catch (err) {

        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })

    }

}



stores.deleteStore = async (req, res) => {
    try {

        let { id } = req.body;

        store.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let storeData = {
                    status: 0

                }
                result.update(storeData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.STORE_DELETED_SUCCESS,
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

stores.addTransaction = async (req, res) => {
    try {

        let userData = await validation.transaction(req.body)
        if (userData.message) {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.INVAILID_DATA,
                data: userData.message
            })
        } else {
            let result = await books_transactions.create(userData);
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.STORE_SAVE_SUCCESS,
                data: result
            })
        }

    }
    catch (err) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })

    }
}

stores.getAllStores = async (req, res) => {
    try {
        let { search } = req.body;
        let condition = {
            status: true
        }
        if (search) {
            condition = {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${search}%`
                    },
                    type: {
                        [Op.like]: `%${search}%`
                    },
                    address: {
                        [Op.like]: `%${search}%`
                    }
                }
            }
        }
        store.findAll({
            where: condition
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



stores.deleteTransaction = async (req, res) => {
    try {

        let { id } = req.body;

        books_transactions.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let storeData = {
                    status: 0

                }
                result.update(storeData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.STORE_DELETED_SUCCESS,
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




stores.getAllTransactionBystoreId = async (req, res) => {
    try {

        let { id } = req.body;

        let newQuery = "SELECT * FROM "

        let query = "SELECT stores.status,books_transactions.createdAt,books_transactions.id as transaction_id,books_transactions.received,books_transactions.book_qty,fromUser.first_name as from_first_name,fromUser.last_name as from_last_name,toUser.first_name as to_first_name,toUser.last_name as to_last_name,stores.name as store_name,stores.type as store_type,stores.address as store_address FROM `books_transactions`" +

            " LEFT JOIN users fromUser ON books_transactions.from = fromUser.id " +

            " LEFT JOIN users toUser ON books_transactions.to = toUser.id " +

            " LEFT JOIN stores ON books_transactions.storeId = stores.id " +
            " WHERE stores.id = " + id;

        db.sequelize.query(query, { type: QueryTypes.SELECT }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })

        }).catch(err => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: err
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

stores.getTransactionDetails = async (req, res) => {
    try {
        let { id } = req.body;

        let query = "SELECT books_transactions.book_details,books_transactions.id,books_transactions.received,books_transactions.book_qty,fromUser.first_name as from_first_name,fromUser.last_name as from_last_name,toUser.first_name as to_first_name,toUser.last_name as to_last_name,stores.name as store_name,stores.type as store_type,stores.address as store_address,stores.timing as store_timing,stores.description as store_description,stores.description_en as store_description_en FROM `books_transactions`" +

            " LEFT JOIN users fromUser ON books_transactions.from = fromUser.id " +

            " LEFT JOIN users toUser ON books_transactions.to = toUser.id " +

            " LEFT JOIN stores ON books_transactions.storeId = stores.id " +
            " WHERE books_transactions.id = " + id;
        db.sequelize.query(query, { type: QueryTypes.SELECT }).then(result => {

            let massage = (result.length > 0) ? Constant.BLOG_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })

        }).catch(err => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: err
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


stores.AprovedStore = async (req, res) => {
    try {

        let { id, status } = req.body;

        store.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let storeData = {
                    approved: status

                }
                result.update(storeData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.STORE_STATUS_UPDATE_SUCCESS,
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
stores.multideleteStore = async (req, res) => {
    try {

        let { id } = req.body;

        store.findOne({
            where: {
                id:{
                    [Op.or]:id
                }
            }
        }).then(async (result) => {
            if (result) {
                let storeData = {
                    status: 0

                }
                result.update(storeData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.STORE_DELETED_SUCCESS,
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
module.exports = stores;