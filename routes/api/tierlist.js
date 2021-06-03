const router = require('express').Router();
const db = require('../../models');

require("dotenv").config();

router.get("/", async (req, res) => {
    try {
        const rankings = await db.TierList.find({ user: process.env.TEST_USER_ID }).select('-list');
        res.json(rankings || []);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const rankings = await db.TierList.findById(req.params.id).populate({
            path: 'list',
            populate: {
                path: 'player',
                model: 'Player'
            }
        });
        res.json(rankings || []);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;