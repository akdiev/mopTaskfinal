const router = require('express').Router();
const controller = require('../controllers/question.controller');

// QUESTION ROUTE

router.get('/status', (req, res) => res.send('OK'));

router.route('/').get(controller.list);
router.route('/:id').get(controller.listbyUser);
router.route('/').post(controller.create);

router.route('/:id').get(controller.get);
router.route('/:id').delete(controller.remove);
router.route('/:id').put(controller.update);

module.exports = router;
