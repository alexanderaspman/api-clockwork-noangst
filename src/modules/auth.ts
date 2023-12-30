
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'



export const comparePassword = (password , hash)=>{
    return bcrypt.compare(password,hash)
}


export const hashPassword = (password)=>{
    return bcrypt.hash(password, 5)
}

export const createJWT = (user)=>{
    const token = jwt.sign({

        id:user.id,
        username:user.username
    },
    process.env.JWT_SECRET
    )
    return token
}
export const protect = (req,res,next)=>{
    const bearer = req.headers.authorization;

    if(!bearer){
        res.status(401)
        res.json({message:'auh auh auh, you need to respect my authority!'})
        return
    }
    const [,token]= bearer.split(' ')

    if(!token){
        res.status(401)
        res.json({message:'auh auh auh, you need to respect my authority! Get Toked'})
        res.send('auh auh auh, you need to respect my authority!')
        return
    }
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }
    
    catch (e){
        res.status(401)
        res.json({message: 'auh auh auh, you need to respect my authority! Token is black'})
    }
}