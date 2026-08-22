import Company from "../models/company.models.js";

// ===============================
// REGISTER COMPANY
// ===============================
export const registerCompany = async (req, res) => {
  try {
    const { Companyname } = req.body;

    if (!Companyname) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    console.log("Company name:", Companyname);
    console.log("Logged in user ID:", req.id);

    // Check if company already exists
    const company = await Company.findOne({
      name: Companyname,
    });

    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    // Create company
    const newCompany = await Company.create({
      name: Companyname,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company: newCompany,
      success: true,
    });

  } catch (error) {
    console.log("Register company error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


// ===============================
// GET MY COMPANY
// ===============================
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    console.log("Getting company for user:", userId);

    const companies = await Company.find({
      userId: userId,
    });

    console.log("Companies found:", companies);

    return res.status(200).json({
      companies,
      success: true,
    });

  } catch (error) {
    console.log("Unable to get company:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


// ===============================
// GET COMPANY BY ID
// ===============================
export const getCompanybyId = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company found successfully",
      company,
      success: true,
    });

  } catch (error) {
    console.log("Error getting company by ID:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


// ===============================
// UPDATE COMPANY
// ===============================
export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const {
      name,
      description,
      location,
      logo,
      website,
    } = req.body;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Make sure this company belongs to logged-in user
    if (company.userId.toString() !== req.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this company",
        success: false,
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        name,
        description,
        location,
        logo,
        website,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
      success: true,
    });

  } catch (error) {
    console.log(
      "Something went wrong while updating company:",
      error
    );

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};