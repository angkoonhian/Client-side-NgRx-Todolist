import * as express from 'express';

const router = express.Router();

/**
 * @route GET api/listings
 * @desc Test Router
 * @access Public
 */
router.get('/', (req, res) => res.send('Listings route'));

module.exports = router;
