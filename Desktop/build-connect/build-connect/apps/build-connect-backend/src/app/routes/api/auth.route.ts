import * as express from 'express';
export const router = express.Router();
import rateLimit from 'express-rate-limit';
import { check } from 'express-validator';
import { checkInputError, asyncHandler } from '../../middleware';
import {
  ALPHA_WHITESPACE_REGEX,
  PASSWORD_REGEX,
  INVALID_EMAIL_MSG,
  INVALID_ALPHA_SPACE_MSG,
  INVALID_PASSWORD_MSG,
  INVALID_EXISTING_MSG
} from '../../utils';

// import controllers here
import { authController } from '../../controllers/auth';

// input validation chain definition
const validateRegisterFields = [
  check('username', INVALID_ALPHA_SPACE_MSG('username'))
    .trim()
    .notEmpty()
    .matches(ALPHA_WHITESPACE_REGEX),
  check('email', INVALID_EMAIL_MSG).trim().isEmail().normalizeEmail(),
  check('password', INVALID_PASSWORD_MSG).matches(PASSWORD_REGEX)
];

const validateLoginFields = [
  check('email', INVALID_EMAIL_MSG).trim().isEmail().normalizeEmail(),
  check('password', INVALID_PASSWORD_MSG).matches(PASSWORD_REGEX)
];

const validateForgetPasswordFields = [
  check('email', INVALID_EMAIL_MSG).trim().isEmail().normalizeEmail()
];

const validateResetPasswordFields = [
  check('password', INVALID_PASSWORD_MSG).matches(PASSWORD_REGEX)
];

const validateUpdatePasswordFields = [
  check('oldPassword', INVALID_EXISTING_MSG('old password')).exists(),
  check('newPassword', INVALID_PASSWORD_MSG).matches(PASSWORD_REGEX)
];

let max: number;
// max number of request in 15min is 5 for prod, and unlimited for non-prod env
if (process.env.NODE_ENV === 'production') {
  max = 5;
} else {
  max = 0;
}

// map routes to controller

// Request limiter for all auth endpoints below this line
router.post(
  '/login',
  validateLoginFields,
  checkInputError,
  asyncHandler(authController.login)
);

// routers below use protect middleware
