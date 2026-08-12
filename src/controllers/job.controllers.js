import Job from "../models/job.models.js";



export const postJob=async(req,res)=>{
    try {
        const {title,description, requirements,salary,location, experienceneed,  jobType  , position, companyId,created_by}=req.body
        const userId=req.id;
        if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    ! experienceneed ||
    !jobType ||
    !position ||
    !companyId
){
    return res.status(400).json({
        message:"something is missing in post job",
        success:false
    });
}
const job=await Job.create({
    title,description, requirements:requirements.split(","),salary,location, experienceneed,  jobType  , position, company:companyId,created_by:userId
});
return res.status(200).json({
message:"job posted succesfully",
job,
success:true
});

        
    } catch (error) {
        console.log("error in posting the job: ",error);
        return res.status(500).json({ message: "Internal server error", success: false })
        
    }
}

export const getAllJobs=async(req,res)=>{
    try {
        const jobs=await Job.find().populate("company");
        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error);
          return res.status(500).json({ message: "Internal server error", success: false })
        
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate("company");
        return res.status(200).json({
            message:"succesfully got all the jobs",
            success:true,
            job
        })
        
    } catch (error) {
       console.log(error);
         return res.status(500).json({ message: "Internal server error", success: false })
        
        
    }
}

export const getRecruiterJobs = async (req, res) => {
  try {
    const userId = req.id;

    const jobs = await Job.find({
      created_by: userId
    }).populate("company");

    return res.status(200).json({
      jobs,
      success: true
    });

  } catch (error) {
    console.log("Error getting recruiter jobs:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};