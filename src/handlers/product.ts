import prisma from "../db"
//hämta allt
export const getProducts= async (req,res)=>{
const user = await prisma.user.findUnique({
    where:{
        id: req.user.id,
          },
          include:{
            products:true 
          }
})
res.json({data: user.products})
}

// hämta en
export const getOneProduct = async(req,res)=>{
const id = req.params.id
const product = await prisma.product.findUnique({
    where:{
        id,
        belongsToId: req.user.id 
    }
})
res.json({data: product})
}

//skapa en produkt
export const createProduct = async (req,res) =>{
    const product = await prisma.product.create({
        data:{name:req.body.name,
        belongsToId:req.user.id}
    })
res.json({data:product})
}
//uppdatera en produkt
export const updateProduct = async (req,res) =>{
    const update = await prisma.product.update({
        where:{
            id_belongsToId:{ 
                id:req.params.id,
                belongsToId:req.user.id}

        },
        data:{name:req.body.name}
    })
    res.json({data:update})
}
//ta bort en produkt
export const deleteProduct = async (req,res) =>{
const deleted = await prisma.product.delete({
    where:{
        id_belongsToId:{ 
            id:req.params.id,
            belongsToId:req.user.id}
       
    }
})
res.json({data:deleted})
}