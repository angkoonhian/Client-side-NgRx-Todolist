import * as crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
import {
  checkPassword,
  ErrorResponse,
  getSignedJwtToken,
  hashPassword
} from '../utils/index';
import User from '../models/user';

export class AuthController {
  /**
   * @desc Login user
   * @route POST /api/auth/Register
   * @acces public
   */
  login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const user = await User.findOne({ _username: username });

    // check if user is in the database or not
    if (!user) {
      return next(new ErrorResponse('Invalid login credentials', 401));
    }

    // Check if password matches
    const originalPassword = user._password;
    const isMatch = await checkPassword(password, originalPassword);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid login credentials', 401));
    }

    this.sendTokenResponse(user, 200, res);
    console.log('passed');
  };

  //Helper method to get token from model, create cookie and send response
  private sendTokenResponse = (user, statusCode, res, redirectHome = false) => {
    // Create token

    const token = getSignedJwtToken(user);

    // Set cookie options
    const options = {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRE, 10) * 24 * 60 * 1000
      )
    };

    // Set secure flag to true if in production (cookie will be sent through https)
    if (process.env.NODE_ENV === 'production') {
      const secure = true;
      Object.assign(options, secure);
    }

    if (redirectHome) {
      res.status(statusCode).cookie('token', token, options).redirect('/');
    } else {
      res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
      });
    }
  };

  // Hash pending user token
  private hashToken = (token: string) => {
    // Hash token and set to confirmPasswordToken field of model
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return hashedToken;
  };
}

export const authController = new AuthController();
