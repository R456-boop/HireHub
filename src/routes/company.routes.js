import express from "express";
 import { registerCompany ,getCompany,getCompanybyId,updateComapny} from "../controllers/company.controllers.js";
 import { isAuthenticated } from "../middleware/isauthenticated.js";
  
 const router=express.Router();

 router.route("/get").get(isAuthenticated, getCompany);
 router.route("/register").post(isAuthenticated,registerCompany)
 // not everyone can crreate a company only whod=se who are authenticated 
router.route("/get/:id").get(isAuthenticated,getCompanybyId)
router.route("/update/:id").put(isAuthenticated, updateComapny);
 export default router

//  Am I getting data?

// Use GET.

// Example:

// Show all jobs

// Show profile

// Show companies
// Am I creating something?

// Use POST.

// Example:

// Register

// Login

// Create Job

// Apply Job
// Am I updating something?

// Use PUT (or PATCH).

// Example:

// Edit Profile

// Update Company

// Change Password