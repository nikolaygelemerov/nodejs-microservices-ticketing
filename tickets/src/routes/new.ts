import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@ngeltickets/common';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price is required'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
