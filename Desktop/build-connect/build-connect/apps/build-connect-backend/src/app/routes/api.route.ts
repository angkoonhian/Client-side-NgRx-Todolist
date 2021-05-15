import * as express from 'express';
import { Router } from 'express';

import { router as usersRoute } from './api/users.route';
import { router as authRoute } from './api/auth.route';

class ApiRouter {
  private static instance: ApiRouter;

  private constructor(private readonly route: Router) {
    ApiRouter.instance = this;

    // Mount routes
    this.route.use('/auth', authRoute);
    this.route.use('/users', usersRoute);

    // All unimplemented route give 404 response
    this.route.use('/*', (req, res) =>
      res.status(404).json({
        success: false,
        error: `Route not found: ${req.method} ${req.originalUrl}`
      })
    );
  }

  static init(): Router {
    return this.instance?.route || new ApiRouter(express.Router()).route;
  }
}

export const apiRouter = ApiRouter.init();
