const db = require("../models");
const user = db.admin;
const wishlist = db.wishlist;
const Constant = require('../config/constant')

let wishlists = {};

wishlists.add = async (req,res)=>{
try {
    let {book_id,book_name,book_slug,image_url} = req.body;
    let {userId} = req.user;
    wishlist.findOne({
        where:{
            book_id:book_id
        }
    }).then(data =>{
        if(data){
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.BOOK_ALREADY_EXIST,
                data: null
              }) 
        }else {
            let wishlistData = {
                userId:userId,
                book_id:book_id,
                book_name:book_name,
                book_slug:book_slug,
                image_url:image_url
            };
         wishlist.create(wishlistData).then(async (data)=>{
           let result = await wishlist.findAll({
                where:{
                    userId:userId,
                    status:1
                }
            })

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.WISHLIST_SAVE_SUCCESS,
                data: result
              })
         }).catch(error =>{
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
              }) 
         })
        }
    })
} catch (error) {
    return res.json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: null
      })
}

}



wishlists.delete = async (req,res)=>{
    try {
  
      let { id } = req.body;
      let {userId} = req.user;
      wishlist.findOne({
          where: {
              id: id,
              userId:userId
          }
      }).then(async (result) => {
          if (result) {
              let wishlistData = {
                  status: 0
  
              }
              result.update(wishlistData)
  
              return res.json({
                  code: Constant.SUCCESS_CODE,
                  massage: Constant.DATA_DELETED_SUCCESS,
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



  wishlists.getWishlist = async (req,res)=>{
    try {
        let {userId} = req.user;
        let result = await wishlist.findAll({
          where: {
            userId:userId,
            status:true
          }
        })
    
        let massage =  (result.length>0)?Constant.WISHLIST_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })
    
    }
    catch (err) {
    
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null
    })
    
    }  
  }

  
module.exports = wishlists;