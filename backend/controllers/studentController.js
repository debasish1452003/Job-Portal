import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Student from "../models/studentModel.js";
export const createStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    degree,
    major,
    graduationYear,
    skills,
  } = req.body;

  const student = await Student.create({
    firstName,
    lastName,
    email,
    password,
    degree,
    major,
    graduationYear,
    skills,
  });

  res.status(201).json({
    success: true,
    student,
  });
});

export const login = catchAsyncErrors(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password)
    {
       return res.status(401).json({
         sucess:false,
         message:"please provide all data carefully"
       })
    }
    const student = await Student.findOne({email});
    if(!student)
    {
      return res.status(401).json({
        sucess:false,
        message:"please register first",
      })
    }
    return res.status(200).json({
        sucess:true,
        message:"login sucessfully"
      })
    
})

