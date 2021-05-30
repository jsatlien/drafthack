const router = require('express').Router();
const draftRoutes = require('./draft');

router.use('/draft', draftRoutes);

module.exports = router;