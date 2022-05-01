'use strict'
const jwt = require('jsonwebtoken');
const Constant = require('../config/constant')
const db = require("../models");
const e = require('express');
const blog = db.blog;
const event = db.event;
const middileware = {};
const SECRET = process.env.SECRET;

middileware.checkAuthentication = (req, res, next) => {

    try {
        const { authorization } = req.headers;
        const decoded = jwt.verify(authorization, SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.json({
            code: Constant.INVALID_CODE,
            massage: Constant.INVALID_TOKEN,
            data: null
        })
    }
}


middileware.checkBlogDeleteAuthentication = (req, res, next) => {

    try {
        
        let {userId,role} = req.user;
        let {id} = req.body;
        if(role == 1 || role == 2) {
            next();
        }else {

           blog.findOne({
                where: {
                    id: id,
                    userId:userId
                }
            }).then(result =>{
                if(result){
                    next();
                }else{
                    return res.json({
                        code: Constant.INVALID_CODE,
                        massage: Constant.USER_NOT_AUTHORIZED,
                        data: null
                    })
                }
            }).catch(error =>{
                return res.json({
                    code: Constant.INVALID_CODE,
                    massage: Constant.INVALID_TOKEN,
                    data: null
                })
            })
        }
        
        
    } catch (error) {
        return res.json({
            code: Constant.INVALID_CODE,
            massage: Constant.INVALID_TOKEN,
            data: null
        })
    }
}


middileware.checkEventAuthentication = (req, res, next) => {

    try {
        
        let {userId,role} = req.user;
        let {id} = req.body;
        if(role == 1 || role == 2) {
            next();
        }else {

            event.findOne({
                where: {
                    id: id,
                    userId:userId
                }
            }).then(result =>{
                if(result){
                    next();
                }else{
                    return res.json({
                        code: Constant.INVALID_CODE,
                        massage: Constant.USER_NOT_AUTHORIZED,
                        data: null
                    })
                }
            }).catch(error =>{
                return res.json({
                    code: Constant.INVALID_CODE,
                    massage: Constant.INVALID_TOKEN,
                    data: null
                })
            })
        }
        
        
    } catch (error) {
        return res.json({
            code: Constant.INVALID_CODE,
            massage: Constant.INVALID_TOKEN,
            data: null
        })
    }
}



module.exports = middileware;