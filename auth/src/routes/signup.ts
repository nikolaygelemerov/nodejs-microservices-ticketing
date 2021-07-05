import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as Model from '../models';
import { BadRequestError, RequestValidationError } from '../services';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Passowrd must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await Model.User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = Model.User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export default router;
