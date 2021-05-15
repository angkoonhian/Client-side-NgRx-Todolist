import * as express from 'express';

const router = express.Router();

/**
 * @route GET api/profile
 * @desc Test Router
 * @access Public
 */
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
