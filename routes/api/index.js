const router = require('express').Router();
const draftRoutes = require('./draft');
const uploadRoutes = require('./upload');
const rankingsRoutes = require('./rankings');

router.use('/rankings', rankingsRoutes);
router.use('/draft', draftRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;