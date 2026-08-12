import Company from "../models/company.models.js";

export const registerCompany=async(req,res)=>{
    try {
        const {Companyname}=req.body;
        if(!Companyname)
        {
            return res.status(400).json({
                message:"company name is required",
                success:false
            });
        }
        console.log(Companyname);

        const company=await Company.findOne({name:Companyname});
        if(company)
        {
            return res.status(400).json({
                message:"company already exists",
                success:false
            })
        }


        await Company.create({
            name:Companyname,
            userId:req.id
        });

        res.status(201).json({
            message:"company  registered succesfully "
        });
        
    } catch (error) {
        console.log(error);
          return res.status(500).json({ message: "Internal server error", success: false ,error:error.message})

        
        
    }
}

export  const getCompany=async(req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({ userId});
        return res.status(200).json({
            companies,
            success:true
        });
        
    } catch (error) {
        console.log("we are unable to get the comapny: ",error);
          return res.status(500).json({ message: "Internal server error", success: false })
        
        
    }
}


// Recruiter Dashboard
//         │
//         ▼
// Clicks "Google"
//         │
//         ▼
// Frontend sends:
// GET /api/v1/company/get/101
//         │
//         ▼
// Backend finds Google company
//         │
//         ▼
// Frontend shows Edit Company page
export const getCompanybyId=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        return response.status(200).json({
            message:"comapny id is found",
            success:true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export const updateComapny=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const{name,description,location,logo,website}=req.body;
        const updateData={
            name,
            description,
            location,
            logo,
            website
        };
        const company=await Company.findByIdAndUpdate(
            companyId,
            updateData,
            {
                new:true
            }
           
        )
        return res.status(200).json({
            message:"comapny updated suceesfully",
            company
            ,success:true
        })
    } catch (error) {
        console.log(" some thing wrong happened while updating the company:",error);
        
    }
};