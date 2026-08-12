
import Application from "../models/application.models.js";
import Job from "../models/job.models.js";
export const applyJob=async(req,res)=>{
    try {
        const UserId=req.id;
        const jobId=req.params.id;

      const existingapplication=await Application.findOne({
        job:jobId,
        applicant:UserId
      })  ;

      if(existingapplication){
        return res.status(400).json({
            message:"you have a already aplied for this job",
            success:false
        });
      }
      const job=await Job.findById(jobId);
      if(!job)
      {
        return res.status(404).json({
            message:"job not found",
            success:false
        });
      }

      await Application.create({
        job:jobId,
        applicant:UserId
      });

      return res.status(201).json({
message:"jobs applied succesfully",
success:true
      });
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:   "applications",
            populate:{
                path:"applicant"
            }
        });
        return res.status(200).json({
job,
success:true
        }) 
        
    } catch (error) {
        console.log("cant find get applicants: ",error);
        
    }
}

export const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const applications=await Application.find({
            applicant:userId
        }).populate("job");
        return res.status(200).json({
            applications,
            success:true
        });
    } catch (error) {
        console.log("error is there while finding the applied jobs: ",error);
        
    }
}


export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        const application=await Application.findById(applicationId);
        if(!application)
        {
            return res.status(404).json({
                message:"applications not found",
                success:false
            });
        }
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"application status updated successfully"
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

