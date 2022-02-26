import express from 'express';

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStatus,
} from '../controllers/jobControllers.js';

const router = express.Router();

router.route('/stats').get(showStatus);
router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
