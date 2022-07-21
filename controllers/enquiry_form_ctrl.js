"use strict";
const config = require("../config");
const db = require("../models");
const bcrypt = require("bcryptjs");
const enquiry_form = db.enquiry_form;
const Op = db.Sequelize.Op;
const utility = require("../helpers/utility");
const validation = require("../helpers/validation");
const Constant = require("../config/constant");
let enquiryForm = {};

enquiryForm.addEnquiry = async (req, res) => {
  try {
    let { name, phone, email, message, subject } = req.body;
    let data = {
      name: name,
      phone: phone,
      email: email,
      message: message,
      subject: subject,
    };

    enquiry_form
      .create(data)
      .then(async (result) => {
        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.ENQUIRY_CREATED,
          data: result,
        });
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

enquiryForm.getEnquiryById = async (req, res) => {
  try {
    let { userId } = req.body;
    let data = await enquiry_form.findAll({
      where: {
        id: userId,
        status: true,
      },
    });
    let massage =
      data.length > 0 ? Constant.ENQUIRY_RETRIVED : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

enquiryForm.getAllEnquiry = async (req, res) => {
  try {
    let data = await enquiry_form.findAll({
      where: {
        status: true,
      },
    });
    let massage =
      data.length > 0 ? Constant.ENQUIRY_RETRIVED : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

enquiryForm.deleteEnquiry = async (req, res) => {
  try {
    let { id } = req.body;
    enquiry_form
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let Data = {
            status: 0,
          };
          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.ENQUIRY_DELETED,
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

enquiryForm.editEnquiry = async (req, res) => {
  try {
    let { id, name, phone, email, message, subject } = req.body;
    let Data = {
      name: name,
      phone: phone,
      email: email,
      message: message,
      subject: subject,
    };
    enquiry_form
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          result.update(Data);
          return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.ENQUIRY_UPDATED,
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
module.exports = enquiryForm;
