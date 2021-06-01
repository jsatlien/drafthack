const router = require('express').Router();
const db = require('../../models');

require("dotenv").config();

  router.get("/", async (req, res) => { 
    try {
        const rankings = await db.Rankings.find({ user: process.env.TEST_USER_ID});
        res.json(rankings || []);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
  });


  module.exports = router;