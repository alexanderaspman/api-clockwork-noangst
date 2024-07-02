import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req:any, res:any) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),

    }
  })
  
 const token = createJWT(user)
res.json({token})
}

export const signin = async (req:any, res:any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    res.status(401).json({ message: 'No user found with this email.' });
    return;
  }

  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};