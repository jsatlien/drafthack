const router = require('express').Router();
const draftRoutes = require('./draft');
const uploadRoutes = require('./upload');

router.use('/draft', draftRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;