const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');
const reactionRoutes = require('./reactionRoutes');
const friendRoutes = require('./friendRoutes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/friend', friendRoutes);
router.use('/reaction', reactionRoutes);

module.exports = router;
