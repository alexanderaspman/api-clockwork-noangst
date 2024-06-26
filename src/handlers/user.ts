import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req,res) =>{
const user = await prisma.user.create({
    data:{
        email:req.body.email,
        password: await hashPassword(req.body.password),
       
    }
})

 const token = createJWT(user)
res.json({token})
}
export const signin = async (req,res) =>{
    const user = await prisma.user.findUnique({
        where:{
            email: req.body.email
        }
    })
 const isValid = await comparePassword(req.body.password,user.password)
if(!isValid){

res.status(401)
res.json({message:'no auth for you! I am not a nazi, there is a valid way to do this.'})
return 
}

const token = createJWT(user)
res.json({token})

}