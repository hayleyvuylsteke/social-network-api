const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of user for userRoutes
router.use('/user', userRoutes);

module.exports = router;