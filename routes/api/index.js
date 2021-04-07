const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes')

// add prefix of user for userRoutes
router.use('/user', userRoutes);

//add prefix of thoguht for commentRoutes
router.use('/thoughts', thoughtRoutes)

module.exports = router;