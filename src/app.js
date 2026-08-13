import express from "express";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/company.routes.js";
import jobRoute from"./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";
import cors from "cors";

import userRoute from "./routes/user.routes.js";

const app = express();

app.use(

  cors({
    origin: "https://hire-hub-rust.vercel.app",
    credentials: true,
  })
  
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application", applicationRoute);
//Notice how app.js doesn't know anything about controllers or MongoDB. Its only job is to say:

// "If the request starts with /api/v1/user, send it to the user routes. If it starts with /api/v1/company, send it to the company routes."
app.get("/",(req,res)=>{
    res.send("welcome to the hirehub backend")
})
app.get("/test",(req,res)=>{
    res.json({
        success:true,
        message:"my api is working now"
    });
});

export default app;