var express = require("express");
var router = express.Router();
var enquiry = require("../controllers/enquiry_form_ctrl");
const middileware = require("../middileware");

router.post("/addEnquiry",enquiry.addEnquiry);
router.post("/getEnquiryById", enquiry.getEnquiryById);
router.get("/getAllEnquiry", enquiry.getAllEnquiry);
router.put(
  "/editEnquiry",
  middileware.checkAuthentication,
  enquiry.editEnquiry
);
router.delete(
  "/deleteEnquiry",
  middileware.checkAuthentication,
  enquiry.deleteEnquiry
);

module.exports = router;
