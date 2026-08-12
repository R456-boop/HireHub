import express from "express";
import { applyJob,getAppliedJobs,getApplicants ,updateStatus} from "../controllers/application.controllers.js";
import { isAuthenticated } from "../middleware/isauthenticated.js";
const router=express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/:id/status").patch(isAuthenticated,updateStatus)

export default router;