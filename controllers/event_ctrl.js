'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const utility = require('../helpers/utility');
const db = require("../models");
const Constant = require('../config/constant');
const event = db.event;
const admin = db.admin;
const event_category = db.event_category;
const { Op } = require("sequelize");
let events = {};



events.add = async (req, res) => {
    try {
        let { name, name_en, date, time, description, description_en, category_id, image } = req.body;
        let { userId } = req.user;
        let fileName = '';
        let slug = await utility.generateSlug(name, event);

        let eventData = {
            name: name,
            name_en: name_en,
            category_id: category_id,
            date: date,
            time: time,
            slug: slug,
            description: description,
            description_en: description_en,
            image: fileName,
            userId: userId

        }
        let result = await event.create(eventData);
        if (result) {

            if (image) {
                fileName = await utility.uploadBase64Image(image)

                let userData = {
                    image: fileName

                }
                result.update(userData)
            }

            let data = await event.findAll({
                where: {
                    status: true
                },
                include: [{
                    model: event_category,
                    where: {
                        status: true
                    },
                }]
            })

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.EVENT_SAVE_SUCCESS,
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
            data: null
        })
    }
}


events.edit = async (req, res) => {
    try {
        let { id, name, name_en, date, time, description, description_en, category_id } = req.body;
        let { userId } = req.user;
        let fileName = '';
        if (req.files) {
            fileName = await utility.fileupload(req.files)
        }
        let eventData = {
            name: name,
            name_en: name_en,
            date: date,
            time: time,
            description: description,
            description_en: description_en,
            image: fileName,
            userId: userId,
            category_id: category_id,

        }

        event.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(eventData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.EVENT_UPDATED_SUCCESS,
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
            data: null
        })
    }
}

events.getAllEvents = async (req, res) => {
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
                    description: {
                        [Op.like]: `%${search}%`
                    },
                    '$event_category.name$': {
                        [Op.like]: `%${search}%`
                    }
                }
            }
        }
        event.findAll({
            where: condition,
            include: [{
                model: event_category,
                where: {
                    status: true
                },
            },{
                model: admin
            }]
        }).then(result => {
            let massage = (result.length > 0) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
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

events.getEventBySlug = async (req, res) => {
    try {

        let { slug } = req.body;
        event.findOne({
            where: {
                slug: slug,
                status: true
            }
        }).then(result => {
            let massage = (result) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
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

events.getEventsByUserId = async (req, res) => {
    try {

        let { userId } = req.user;
        admin.findAll({
            where: {
                id: userId
            },
            include: [{
                model: event,
                where: {
                    status: true
                }
            }]
        }).then(result => {
            let massage = (result.length > 0) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
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

events.delete = async (req, res) => {
    try {

        let { id } = req.body;

        event.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let evetData = {
                    status: 0

                }
                result.update(evetData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.Event_DELETED_SUCCESS,
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

events.getEventsByCategoryname = async (req, res) => {
    try {
        let { name } = req.body;
        event_category.findAll({
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
            include: [{
                model: event,
                where: {
                    status: true
                }
            }]

        }).then(result => {
            let massage = (result.length > 0) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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


events.getEventsByCategoryId = async (req, res) => {
    try {
        let { id } = req.body;
        event.findAll({
            where: {
                category_id: id,
                status: true
            },
            include: [{
                model: event_category,
                where: {
                    status: true
                }
            }]

        }).then(result => {
            let massage = (result.length > 0) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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


events.addEventCategory = async (req, res) => {
    try {

        let { name, name_en, description, description_en } = req.body;

        let eventData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        let result = await event_category.create(eventData);
        if (result) {
            let data = await event_category.findAll({
                where: {
                    status: true
                },
            })

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.EVENT_CATEGORY_SAVE_SUCCESS,
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


events.editEventCategory = async (req, res) => {
    try {

        let { id, name, name_en, description, description_en } = req.body;

        let eventData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        event_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(eventData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.EVENT_CATEGORY_UPDATED_SUCCESS,
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

events.deleteEventCategory = async (req, res) => {
    try {

        let { id } = req.body;
        event_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let eventData = {
                    status: 0

                }
                result.update(eventData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.EVENT_CATEGORY_DELETED_SUCCESS,
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


events.getAllEventsCategory = async (req, res) => {
    try {
        event_category.findAll({
            where: {
                status: true
            },
        }).then(result => {
            let massage = (result.length > 0) ? Constant.EVENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

events.multidelete = async (req, res) => {
    try {

        let { id } = req.body;

        event.findOne({
            where: {
                id:{
                    [Op.or]:id
                }
            }
        }).then(async (result) => {
            if (result) {
                let evetData = {
                    status: 0

                }
                result.update(evetData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.Event_DELETED_SUCCESS,
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

module.exports = events;
