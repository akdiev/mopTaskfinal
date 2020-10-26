const router = require('express').Router();
const controller = require('../controllers/user.controller');
// const protectedRoute = require('./protectRoutes');

// USERS ROUTE

router.get('/status', (req, res) => res.send('OK'));

router.route('/').get(controller.list);
// router.route('/?').get(controller.listUserWithMostAnswers);
router.route('/login').post(controller.login);
router.route('/').post(controller.create);

router.route('/:id').get(controller.get);
router.route('/:id').delete(controller.remove);
router.route('/:id').put(controller.update);

module.exports = router;
