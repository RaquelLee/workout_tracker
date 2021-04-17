const router = require('express').Router();
const apiRoutes = require('./api/workoutRoutes.js');
const homeRoutes = require('./htmlRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
