const express = require("express");
const router = express.Router();
const { contact } = require("../Controller/Contact.controller");

router.post("/", contact);

module.exports = router;
