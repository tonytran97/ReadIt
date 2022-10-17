const router = require(`express`).Router();
const reviewRoutes = require(`./reviewRoute`);
const userRoutes = require(`./userRoute`);

router.use(`/review`, reviewRoutes);
router.use(`/users`,userRoutes);

module.exports = router;