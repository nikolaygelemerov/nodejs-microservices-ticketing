import express from 'express';

import { currentUser, requireAuth } from '@ngeltickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export default router;
