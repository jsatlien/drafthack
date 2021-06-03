const router = require('express').Router();
const draftRoutes = require('./draft');
const uploadRoutes = require('./upload');
const rankingsRoutes = require('./rankings');
const tierListRoutes = require('./tierlist');

router.use('/rankings', rankingsRoutes);
router.use('/tierlist', tierListRoutes);
router.use('/draft', draftRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;