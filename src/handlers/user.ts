import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req,res) =>{
const user = await prisma.user.create({
    data:{
        name: req.body.name,
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
            name:req.body.name,
            email: req.body.email
        }
    })
const isValid = await comparePassword(req.body.password,user.password)
if(!isValid){

res.status(401)
res.json({message:'auh auh auh, auth not valid!'})
}
}