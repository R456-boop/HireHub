import express from"express"
import { postJob,getAllJobs,getJobById,getRecruiterJobs } from "../controllers/job.controllers.js";
import { isAuthenticated } from "../middleware/isauthenticated.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob)

router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/recruiter").get(isAuthenticated,getRecruiterJobs)
export default router;


