import Application from "../models/application.models.js";
import Job from "../models/job.models.js";


// =====================================================
// APPLY FOR JOB
// =====================================================

export const applyJob = async (req, res) => {

    try {

        const userId = req.id;
        const jobId = req.params.id;


        // ================= CHECK IF ALREADY APPLIED =================

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {

            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });

        }


        // ================= CHECK JOB =================

        const job = await Job.findById(jobId);

        if (!job) {

            return res.status(404).json({
                message: "Job not found",
                success: false
            });

        }


        // ================= CREATE APPLICATION =================

        await Application.create({
            job: jobId,
            applicant: userId,
            status: "pending"
        });


        // ================= RESPONSE =================

        return res.status(201).json({

            message: "Job applied successfully",

            success: true

        });

    } catch (error) {

        console.log(
            "Error while applying for job:",
            error
        );

        return res.status(500).json({

            message: "Internal server error",

            success: false

        });

    }

};



// =====================================================
// GET APPLIED JOBS
// =====================================================

export const getAppliedJobs = async (req, res) => {

    try {

        const userId = req.id;


        // ================= GET APPLICATIONS =================

        const applications = await Application
            .find({
                applicant: userId
            })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });


        return res.status(200).json({

            applications,

            success: true

        });

    } catch (error) {

        console.log(
            "Error while finding applied jobs:",
            error
        );

        return res.status(500).json({

            message: "Error while getting applied jobs",

            success: false

        });

    }

};



// =====================================================
// GET APPLICANTS FOR RECRUITER'S JOB
// =====================================================
export const getApplicants = async (req, res) => {
    try {

        const jobId = req.params.id;

        console.log("=================================");
        console.log("Getting applicants");
        console.log("Job ID:", jobId);
        console.log("=================================");


        // ================= FIND JOB =================

        const job = await Job.findById(jobId)
            .populate("company");


        if (!job) {

            return res.status(404).json({
                message: "Job not found",
                success: false
            });

        }


        // ================= FIND APPLICATIONS =================

        const applications = await Application.find({
            job: jobId
        })
        .populate({
            path: "applicant",
            select: "-password"
        });


        console.log("Job:", job.title);

        console.log(
            "Number of applications:",
            applications.length
        );


        // ================= RESPONSE =================

        return res.status(200).json({

            success: true,

            job: job,

            applications: applications

        });


    } catch (error) {

        console.log(
            "================================="
        );

        console.log(
            "GET APPLICANTS ERROR:"
        );

        console.log(error);

        console.log(
            "================================="
        );


        return res.status(500).json({

            message: "Error while getting applicants",

            success: false,

            error: error.message

        });

    }
};



// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

export const updateStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const applicationId = req.params.id;


        // ================= VALIDATE STATUS =================

        const allowedStatuses = [
            "pending",
            "accepted",
            "rejected"
        ];


        if (!status) {

            return res.status(400).json({

                message: "Status is required",

                success: false

            });

        }


        if (!allowedStatuses.includes(status.toLowerCase())) {

            return res.status(400).json({

                message:
                    "Status must be pending, accepted or rejected",

                success: false

            });

        }


        // ================= FIND APPLICATION =================

        const application = await Application.findById(
            applicationId
        );


        if (!application) {

            return res.status(404).json({

                message: "Application not found",

                success: false

            });

        }


        // ================= UPDATE STATUS =================

        application.status = status.toLowerCase();

        await application.save();


        // ================= RESPONSE =================

        return res.status(200).json({

            message: "Application status updated successfully",

            success: true,

            application

        });

    } catch (error) {

        console.log(
            "Error while updating application status:",
            error
        );


        return res.status(500).json({

            message: "Internal server error",

            success: false

        });

    }

};