import express from "express";

import {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
} from "../controllers/application.controllers.js";

import { isAuthenticated } from "../middleware/isauthenticated.js";

const router = express.Router();


// =====================================================
// APPLY FOR A JOB
// POST /api/v1/application/apply/:id
// =====================================================

router
    .route("/apply/:id")
    .post(
        isAuthenticated,
        applyJob
    );


// =====================================================
// GET JOBS APPLIED BY CURRENT USER
// GET /api/v1/application/get
// =====================================================

router
    .route("/get")
    .get(
        isAuthenticated,
        getAppliedJobs
    );


// =====================================================
// GET APPLICANTS FOR A PARTICULAR JOB
// GET /api/v1/application/:id/applicants
// =====================================================

router
    .route("/:id/applicants")
    .get(
        isAuthenticated,
        getApplicants
    );


// =====================================================
// UPDATE APPLICATION STATUS
// PATCH /api/v1/application/:id/status
// =====================================================

router
    .route("/:id/status")
    .patch(
        isAuthenticated,
        updateStatus
    );


export default router;